const About = () => {
  return (
    <div className='mx-auto rounded-md bg-white p-8 shadow-md'>
      <h2 className='mb-4 text-xl font-semibold'>咖啡的風味</h2>

      <ul className='list-disc pl-4'>
        <li className='mb-4'>
          <span className='font-semibold'>酸度（acidity）：</span>
          喝咖啡時，舌頭邊緣感受到的刺激。和檸檬那種酸不一樣，而是咖啡提振味覺的一種清新、爽朗感，有時又被稱為明亮度（brightness）。酸度是咖啡很重要的一個特質，沒有酸度的咖啡味道會很平淡。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>香氣（aroma）：</span>
          咖啡沖煮後的香味，比舌頭能感受到的味道更為多樣化。常用來形容咖啡香氣的形容詞有果香（fruit-like）、土地芬芳（earthy）、煙熏（smoky）、花朵香（flowery）、莓果（berries）、堅果（nuts）等等。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>醇度（body）：</span>
          咖啡在口中的口感，從清淡如水或脫脂乳，到濃稠如牛奶或奶油、糖漿都有。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>餘味（aftertaste）：</span>
          和品酒的概念相似，指咖啡喝下去後嘴巴裡殘留的味道。有些咖啡有可可或巧克力的餘味，有些則有水果、莓果、堅果等等。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>平衡度（balance）：</span>
          這是對咖啡整體味道的評價，好的咖啡豆味道均衡、有層次，並且香氣柔和；不好的咖啡豆則通常只呈現單一味道。
        </li>
      </ul>

      <h2 className='mb-4 text-xl font-semibold'>常見形容詞</h2>
      <ul className='list-disc pl-4'>
        <li className='mb-4'>
          <span className='font-semibold'>香醇（mellow）：</span>
          指低至中酸度，平衡性好的咖啡。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>溫和（mild）：</span>
          表示咖啡具有調和、細緻的風味，通常指生長于高海拔的南美洲高級咖啡。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>柔潤（soft）：</span>
          指低酸度，帶點甜味的咖啡，通常指印尼咖啡。
        </li>
      </ul>

      <h2 className='mb-4 text-xl font-semibold'>
        咖啡豆烘焙｜淺焙、中焙、重焙
      </h2>
      <p>
        一般認為咖啡生豆決定咖啡八成的味道，而剩下的兩成由烘焙決定，豆子烘烤的時間，會影響外觀和味道。簡單來說，豆子烘焙時間越長會突顯苦味；而烘焙時間太短，酸味會比較突出。{' '}
      </p>
      <ul className='list-disc pl-4'>
        <li className='mb-4'>
          <span className='font-semibold'>淺焙（cinnamon roast）：</span>
          酸度高，略帶香氣，常用來沖美式咖啡。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>中焙（medium roast）：</span>
          口感偏酸帶苦，香氣適中，保留咖啡豆的原始風味。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>深焙（full city roast）：</span>
          苦味比酸味強，香氣飽滿，多用來做冰咖啡或黑咖啡。
        </li>
        <li className='mb-4'>
          <span className='font-semibold'>重焙（Italian roast）：</span>
          豆子表面有油光，苦味強，有焦味，主要用來做義式濃縮咖啡。
        </li>
      </ul>
      <p>
        好的咖啡豆，是一杯好咖啡的開始。相信看完這篇的你，對咖啡豆有更深的認識了。以後去咖啡廳，可以和
        barista 討論一下，再挑選自己喜歡的咖啡風味！
      </p>
    </div>
  );
};
export default About;
