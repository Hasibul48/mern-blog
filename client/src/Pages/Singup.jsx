import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({});
    const [myError, setMyError] = useState(false);
    const [isLoading, setIsLoading] = useState();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setMyError(false);

            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                setMyError(`Error: ${errorText || 'Response was not ok!'}`);
                setIsLoading(false);
                return;
            }

            const text = await response.text();

            if (text) {
                const data = JSON.parse(text);
                if (data.success) {
                    setMyError(data.message);
                } else {
                    setMyError(data.message);
                }
            } else {
                setMyError('No response body');
            }
        } catch (error) {
            setMyError(`Fetch error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='container md:flex items-center mb-44'>
            <div className="flex-1 justify-center items-center text-center md:mt-[10%]">
                <div className="my-28">
                    <h1 className='font-thin text-4xl m-3 md:m-0'>
                        <span className='bg-gradient-to-r from-indigo-600 via-blue-800 to-pink-700 text-white px-3 rounded-xl py-1 font-semibold'>
                            Hasibul's
                        </span>
                        Blog
                    </h1>
                    <p className='tracking-widest'>Informational Blog Everyday!</p>
                </div>
            </div>
            <div className="flex-1 justify-center items-center flex mt-[-12%] md:mt-[8%]">
                <form className='w-3/5' onSubmit={handleSubmit}>
                    <h3 className='font-bold text-3xl text-center pb-3'>Let's Sign up within a single minute!</h3>
                    <div className='my-4'>
                        <p className='font-semibold'>Enter Your Name</p>
                        <input type="text" className='rounded-3xl w-full' name='name' placeholder='Enter your Name' onChange={handleChange} />
                    </div>
                    <div className='my-4'>
                        <p className='font-semibold'>Enter Your Email</p>
                        <input type="text" className='rounded-3xl w-full' name='email' placeholder='Enter your Email' onChange={handleChange} />
                    </div>
                    <div className='my-4'>
                        <p className='font-semibold'>Enter Your Password</p>
                        <input type="text" className='rounded-3xl w-full' name='password' placeholder='Enter your Password' onChange={handleChange} />
                    </div>

                    <Button type='submit' disabled={isLoading} className='mx-auto w-4/5 rounded-2xl' gradientDuoTone="redToYellow">{isLoading ? 'Loading...' : 'Sign Up'}</Button>
                    <p className='mt-3'>Already a member? <Link className='text-yellow-500 font-semibold' to={'/login'}>Login</Link></p>
                    {myError && <p className='text-red-600 font-semibold mt-6'>{myError}</p>}
                </form>

            </div>
        </div>
    );
}

export default Signup;
