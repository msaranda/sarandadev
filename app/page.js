import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts'); 
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug,
        title: data.title || slug,
        date: data.date || '2024-01-01',
        excerpt: data.excerpt || ''
      };
    })
    .sort((a, b) => (new Date(b.date) - new Date(a.date)));
  
  return allPosts;
}

export default function Home() {
  const posts = getPosts();
  
  return (
    <main style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'monospace',
      lineHeight: '1.6'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '40px' }}>
        I build tools that help overstimulated brains think clearly. Starting with mine.
      </h1>
      
      {posts.length === 0 ? (
        <p>No posts yet. Create a .md file in /posts/ directory.</p>
      ) : (
        <div>
          {posts.map(post => (
            <article key={post.slug} style={{ marginBottom: '40px' }}>
              <Link 
                href={`/posts/${post.slug}`}
                style={{ 
                  color: '#000',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                {post.title}
              </Link>
              <div style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                {post.date}
              </div>
              {post.excerpt && (
                <p style={{ margin: '10px 0', color: '#333' }}>
                  {post.excerpt}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
      
      <footer style={{ 
        marginTop: '80px', 
        paddingTop: '20px', 
        borderTop: '1px solid #eee',
        fontSize: '12px',
        color: '#666'
      }}>
        <p>Building in public. Follow the journey on <a href="https://github.com/msaranda/sarandadev" style={{ color: '#000' }}>GitHub</a></p>
      </footer>
    </main>
  );
}
