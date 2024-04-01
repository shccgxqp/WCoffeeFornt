import { useState } from 'react';
import { useParams } from 'react-router-dom';
const AdminSendEmail = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/auth/server/sendEmail/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, content }),
        credentials: 'include',
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      window.location.reload();
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='flex h-screen w-full flex-col'>
        <label htmlFor='user_password1' className='mb-1 block'>
          信件標題
        </label>
        <input
          type='text'
          id='email_subject'
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className='w-full border border-slate-200 p-4'
        />
        <label htmlFor='user_password1' className='mb-1 block'>
          信件內容
        </label>
        <input
          type='text'
          id='email_content'
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className='w-full border border-slate-200 p-4'
        />
        <button className='mt-2 rounded bg-crimson px-4 py-2 leading-7 text-black' type='submit'>
          送出
        </button>
      </form>
    </>
  );
};

export default AdminSendEmail;
