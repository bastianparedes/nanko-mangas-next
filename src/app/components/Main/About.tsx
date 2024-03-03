import ids from "../../config/id.ts";

const Component = () => {
  return (
    <section
      className="flex flex-col justify-center p-4 w-full bg-gradient-to-r from-orange-50 to-orange-200"
      id={ids.about}
    >
      <h1 className="text-center text-4xl mb-3">¿Quién soy?</h1>
      <div className="flex max-h-96">
        <div className="w-1/3 h-auto flex justify-center items-start">
          <img
            alt="Owner"
            className="w-full h-full object-contain"
            loading="lazy"
            src="/image/girl.png"
          />
        </div>
        <div className="w-2/3">
          <p className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
            nulla illo aspernatur aut iste? Quaerat harum, impedit saepe
            officiis alias reprehenderit atque quas quibusdam, deleniti,
            perferendis ullam! Molestias, pariatur ipsam. Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Quibusdam nulla illo aspernatur
            aut iste? Quaerat harum, impedit saepe officiis alias reprehenderit
            atque quas quibusdam, deleniti, perferendis ullam! Molestias,
            pariatur ipsam. Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Quibusdam nulla illo aspernatur aut iste? Quaerat harum,
            impedit saepe officiis alias reprehenderit atque quas quibusdam,
            deleniti, perferendis ullam! Molestias, pariatur ipsam. Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Quibusdam nulla illo
            aspernatur aut iste? Quaerat harum, impedit saepe officiis alias
            reprehenderit atque quas quibusdam, deleniti, perferendis ullam!
            Molestias, pariatur ipsam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Component;
