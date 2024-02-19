import { SubHeading } from '../components';

import { images } from '../constants';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center px-24 py-16 bg-white" id="home">
      <div className="flex flex-1 w-full justify-center items-flex-start flex-col">
        <SubHeading title="找到屬於你的咖啡" />
        <h1 className="tracking-wide uppercase lineHeight-110 text-golden text-6xl font-base ">
          匠人烘培，一生懸命
        </h1>
        <p
          className="font-alt text-black my-8 mx-0 font-normal tracking-wide capitalize leading-7 text-sm md:text-lg xl:text-2xl "
        >
          請坐下，讓我們分享咖啡的故事。咖啡豆的香氣，讓人心情愉悅。與朋友分享一杯咖啡，是生活中美好的時刻。
          {/* Please have a seat and let&apos;s share some coffee stories. The aroma of coffee beans is delightful and soothing. Sharing a cup of coffee with friends is one of life&apos;s simple pleasures. */}
        </p>
        <button
          type="button"
          className="bg-crimson text-black font-base font-semibold text-base px-6 py-2 rounded"
        >
          Explore Menu
        </button>
      </div>
      <div className="flex flex-1 w-full justify-center items-center mt-20 xl:ml-4">
        <img className="w-full md:w-4/5 " src={images.coffee02} alt="header_image" />
      </div>
    </div>
  );
};

export default Header;
