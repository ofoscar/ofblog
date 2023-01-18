import GrassIcon from '@mui/icons-material/Grass';
import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';

const postsData = [
  {
    title: 'Post 1',
    date: '2021-10-10',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate, quod, quia, voluptates quae quas voluptatibus quibusdam quidem quos nemo voluptatum. Quisquam, quae. Quisquam, quae.',
  },
  {
    title: 'Post 2',
    date: '2021-10-10',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate, quod, quia, voluptates quae quas voluptatibus quibusdam quidem quos nemo voluptatum. Quisquam, quae. Quisquam, quae. Quisquam,',
  },
  {
    title: 'Post 3',
    date: '2021-10-10',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate, quod, quia, voluptates quae quas voluptatibus quibusdam quidem quos nemo voluptatum. Quisquam, quae. Quisquam, quae. Quisquam,',
  },
  {
    title: 'Post 4',
    date: '2021-10-10',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate, quod, quia, voluptates quae quas voluptatibus quibusdam quidem quos nemo voluptatum. Quisquam, quae. Quisquam, quae. Quisquam,',
  },
];

export const Posts = () => {
  return (
    <Box>
      <Stack spacing={3}>
        {postsData.map((post) => (
          <Card sx={{ width: '40vw', boxShadow: 4 }}>
            <CardHeader
              title={post.title}
              subheader={post.date}
              avatar={<GrassIcon />}
            />
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};
