'use client';

import { useEffect, useRef, useState } from 'react';
import Email from '../../icons/Email';
import X from '../../icons/X';

const Component = () => {
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // deno-lint-ignore no-explicit-any
  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch('/api/sendMail', {
      body: JSON.stringify({
        message
      }),
      method: 'POST'
    });

    closeModal();
  };

  useEffect(() => {
    if (!isModalOpen) {
      setMessage('');
    } else if (textRef.current !== null) {
      textRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <>
      <button
        className="text-[#2e2e2e] flex justify-center w-fit items-center md:m-auto"
        onClick={openModal}
      >
        <Email />
        <span className="text-lg">Enviar E-mail</span>
      </button>
      {isModalOpen && (
        <>
          <div
            className="w-svw h-svh bg-gray-500/80 fixed top-0 left-0 z-10 flex items-center justify-center"
            onClick={closeModal}
          />
          <div
            className="bg-white rounded-md p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            id="hola"
          >
            <button
              className="rounded-full flex items-center justify-center text-3xl absolute top-0 right-0 bg-inherit border-black border-2 translate-x-1/2 -translate-y-1/2"
              onClick={closeModal}
            >
              <X />
            </button>
            <form
              className="flex flex-col justify-center gap-2"
              onSubmit={onSubmit}
            >
              <textarea
                className="resize-none w-96 h-52 text-xl"
                name="textarea"
                onChange={onChangeMessage}
                placeholder="Escribe aquí tu mensaje"
                ref={textRef}
                value={message}
              />
              <input
                className="bg-lime-500 p-3 rounded-md w-auto text-white text-xl"
                type="submit"
                value="Enviar"
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Component;
