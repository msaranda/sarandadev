import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

function getPost(slug) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title || slug,
    date: data.date || '2024-01-01',
    content
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => ({
      slug: fileName.replace(/\.md$/, '')
    }));
}

export default function Post({ params }) {
  const post = getPost(params.slug);
  
  if (!post) {
    return (
      <main style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '40px 20px',
        fontFamily: 'monospace'
      }}>
        <h1>404 - Post not found</h1>
        <Link href="/" style={{ color: '#000' }}>← Back home</Link>
      </main>
    );
  }
  
  return (
    <main style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'monospace',
      lineHeight: '1.8'
    }}>
      <Link href="/" style={{ 
        color: '#000', 
        fontSize: '14px',
        textDecoration: 'none'
      }}>
        ← Back
      </Link>
      
      <article style={{ marginTop: '40px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          marginBottom: '10px',
          lineHeight: '1.3'
        }}>
          {post.title}
        </h1>
        
        <div style={{ 
          fontSize: '12px', 
          color: '#666',
          marginBottom: '40px'
        }}>
          {post.date}
        </div>
        
        <div className="markdown-content">
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '20px' }}>{children}</h1>,
              h2: ({children}) => <h2 style={{ fontSize: '20px', marginTop: '32px', marginBottom: '16px' }}>{children}</h2>,
              h3: ({children}) => <h3 style={{ fontSize: '16px', marginTop: '24px', marginBottom: '12px' }}>{children}</h3>,
              p: ({children}) => <p style={{ marginBottom: '16px' }}>{children}</p>,
              ul: ({children}) => <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>{children}</ul>,
              ol: ({children}) => <ol style={{ marginBottom: '16px', paddingLeft: '20px' }}>{children}</ol>,
              li: ({children}) => <li style={{ marginBottom: '8px' }}>{children}</li>,
              a: ({children, href}) => <a href={href} style={{ color: '#000', textDecoration: 'underline' }}>{children}</a>,
              code: ({children}) => <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', fontSize: '14px', fontFamily: 'monospace' }}>{children}</code>,
              pre: ({children}) => <pre style={{ backgroundColor: '#f5f5f5', padding: '16px', overflow: 'auto', fontSize: '14px', marginBottom: '16px' }}>{children}</pre>,
              blockquote: ({children}) => <blockquote style={{ borderLeft: '3px solid #000', paddingLeft: '16px', marginLeft: '0', marginBottom: '16px', fontStyle: 'italic' }}>{children}</blockquote>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}