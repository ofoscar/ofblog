import { Color } from '@tiptap/extension-color';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { ListItem } from '@tiptap/extension-list-item';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from 'lucide-react';
import { useCallback } from 'react';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TipTapEditor = ({
  content,
  onChange,
  placeholder = 'Start writing...',
}: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class:
            'max-w-full h-auto rounded-lg shadow-sm my-4 mx-auto block cursor-pointer',
        },
        allowBase64: true,
        inline: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] px-6 py-4',
        'data-placeholder': placeholder,
      },
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
              alert(
                'File size too large. Please choose an image smaller than 5MB.',
              );
              return true;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
              const src = e.target?.result as string;
              const { tr } = view.state;
              const pos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });
              if (pos) {
                tr.insert(
                  pos.pos,
                  view.state.schema.nodes.image.create({ src, alt: file.name }),
                );
                view.dispatch(tr);
              }
            };
            reader.onerror = () => {
              alert('Error reading file. Please try again.');
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;

    const choice = window.confirm(
      'Do you want to add an image from URL? Click OK for URL, Cancel for file upload.',
    );

    if (choice) {
      // URL input
      const url = window.prompt('Enter image URL');
      if (url) {
        // Basic URL validation
        try {
          new URL(url);
          const alt = window.prompt('Enter alt text (optional)', '') || '';
          editor.chain().focus().setImage({ src: url, alt }).run();
        } catch (e) {
          alert('Please enter a valid URL');
        }
      }
    } else {
      // File upload
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Check file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert(
              'File size too large. Please choose an image smaller than 5MB.',
            );
            return;
          }

          const reader = new FileReader();
          reader.onload = (e) => {
            const src = e.target?.result as string;
            const alt =
              window.prompt('Enter alt text (optional)', file.name) ||
              file.name;
            editor.chain().focus().setImage({ src, alt }).run();
          };
          reader.onerror = () => {
            alert('Error reading file. Please try again.');
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='border border-gray-200 rounded-lg'>
      {/* Toolbar */}
      <div className='border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50 rounded-t-lg'>
        {/* Text Formatting */}
        <div className='flex border-r border-gray-300 pr-2 mr-2'>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('bold') ? 'bg-gray-300' : ''
            }`}
            title='Bold'
          >
            <Bold className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('italic') ? 'bg-gray-300' : ''
            }`}
            title='Italic'
          >
            <Italic className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('underline') ? 'bg-gray-300' : ''
            }`}
            title='Underline'
          >
            <UnderlineIcon className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('strike') ? 'bg-gray-300' : ''
            }`}
            title='Strikethrough'
          >
            <Strikethrough className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('code') ? 'bg-gray-300' : ''
            }`}
            title='Code'
          >
            <Code className='w-4 h-4' />
          </button>
        </div>

        {/* Headings */}
        <div className='flex border-r border-gray-300 pr-2 mr-2'>
          <select
            onChange={(e) => {
              const level = parseInt(e.target.value);
              if (level === 0) {
                editor.chain().focus().setParagraph().run();
              } else {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                  .run();
              }
            }}
            value={
              editor.isActive('heading', { level: 1 })
                ? '1'
                : editor.isActive('heading', { level: 2 })
                ? '2'
                : editor.isActive('heading', { level: 3 })
                ? '3'
                : '0'
            }
            className='px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            <option value='0'>Paragraph</option>
            <option value='1'>Heading 1</option>
            <option value='2'>Heading 2</option>
            <option value='3'>Heading 3</option>
          </select>
        </div>

        {/* Alignment */}
        <div className='flex border-r border-gray-300 pr-2 mr-2'>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''
            }`}
            title='Align Left'
          >
            <AlignLeft className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''
            }`}
            title='Align Center'
          >
            <AlignCenter className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''
            }`}
            title='Align Right'
          >
            <AlignRight className='w-4 h-4' />
          </button>
        </div>

        {/* Lists and Quote */}
        <div className='flex border-r border-gray-300 pr-2 mr-2'>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('bulletList') ? 'bg-gray-300' : ''
            }`}
            title='Bullet List'
          >
            <List className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('orderedList') ? 'bg-gray-300' : ''
            }`}
            title='Numbered List'
          >
            <ListOrdered className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('blockquote') ? 'bg-gray-300' : ''
            }`}
            title='Quote'
          >
            <Quote className='w-4 h-4' />
          </button>
        </div>

        {/* Link and Image */}
        <div className='flex border-r border-gray-300 pr-2 mr-2'>
          <button
            onClick={setLink}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('link') ? 'bg-gray-300' : ''
            }`}
            title='Add Link'
          >
            <LinkIcon className='w-4 h-4' />
          </button>
          <button
            onClick={addImage}
            className='p-2 rounded hover:bg-gray-200'
            title='Add Image'
          >
            <ImageIcon className='w-4 h-4' />
          </button>
        </div>

        {/* Undo/Redo */}
        <div className='flex'>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className='p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
            title='Undo'
          >
            <Undo className='w-4 h-4' />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className='p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
            title='Redo'
          >
            <Redo className='w-4 h-4' />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className='min-h-[400px]'>
        <EditorContent
          editor={editor}
          className='focus-within:outline-none'
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TipTapEditor;
