export default function Home() {
  return (
    <div className="flex flex-row h-full mt-32 items-center lg:mx-12">
      <div className="lg:w-3/5 xl:w-2/5 container mx-auto px-6 md:px-12 relative z-10 flex items-center justify-center">
        <div className="flex flex-col items-start relative z-10 text-center">
          <h1 className="font-roboto-slab text-4xl sm:text-5xl text-orange-500 leading-tight mt-4 text-center">
            Front end Performance with
            <br /> Rick & Morty
          </h1>

          <p className="font-source-sans-pro text-gray-500 mt-12 text-lg px-12">
            Let's dig deeper into front end performance! With a little help from Rick, we
            see how small changes in your app can have huge impacts.
          </p>
          <p className="font-source-sans-pro text-gray-500 mt-6 text-lg px-12">
            So lets dive into Rick's universe and see how we can make your application
            blazing fast
          </p>
        </div>
      </div>
      <div className="mr-8">
        <img
          width={200}
          height={200}
          src="/pickle.png"
          alt="banner"
          className="animate-spin pickle-rick"
        />
      </div>
    </div>
  );
}
