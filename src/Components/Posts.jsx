import GrassIcon from '@mui/icons-material/Grass';
import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Posts() {
  const { posts } = useLoaderData();
  console.log(posts);
  return (
    <Box>
      <Stack spacing={3}>
        {posts.map((post, i) => (
          <Card sx={{ width: '40vw', boxShadow: 4 }} key={post.key}>
            <CardHeader
              key={post.key}
              title={post.title}
              subheader={post.dateFormatted}
              avatar={<GrassIcon />}
            />
            <CardContent key={post.key}>
              <p key={post.key}>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
