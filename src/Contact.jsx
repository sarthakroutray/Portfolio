import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "./styles";
import { slideIn } from "./utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_d4y46is',
        'template_vj69y85',
        {
          from_name: form.name,
          to_name: "Sarthak Routray",
          from_email: form.email,
          to_email: "sarthak.routray2006@gmail.com",
          message: form.message,
        },
        'C-gZ2zL0322Q4J39j'
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <span className='hash-span' id='contact'>
        &nbsp;
      </span>
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Name</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Message</span>
              <textarea
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='What you want to say?'
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              />
            </label>

            <button
              type='submit'
              className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        >
          <div className='w-full h-full flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-secondary text-[17px] max-w-3xl leading-[30px]'>
                Feel free to reach out to me through the form, or connect with me on:
              </p>
              <div className='mt-8 flex flex-col gap-4'>
                <a 
                  href="https://github.com/sarthakroutray" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='text-white text-[18px] hover:text-[#915EFF] transition-colors'
                >
                  GitHub: @sarthakroutray
                </a>
                <a 
                  href="https://www.linkedin.com/in/sarthak-routray-020583323/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='text-white text-[18px] hover:text-[#915EFF] transition-colors'
                >
                  LinkedIn: Sarthak Routray
                </a>
                <a 
                  href="mailto:sarthak.routray2006@gmail.com"
                  className='text-white text-[18px] hover:text-[#915EFF] transition-colors'
                >
                  Email: sarthak.routray2006@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 
