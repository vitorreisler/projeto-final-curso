import hatImg from "../images/pexels-aman-jakhar-1124465.jpg";
import sunGlassImg from "../images/pexels-asim-alnamat-343720 (1).jpg";
import sneakersImg from "../images/pexels-jd-danny-2385477.jpg";


const About = () => {
  return (
    <section className="container">
      <div className="row align-items-center my-5">
        <div className="col">
          <img className="rounded aboutImg shadow" src={hatImg} alt="" />
        </div>
        <div className="col">
          <p className="">
            At Casual City, we celebrate the spirit of urban style and laid-back
            elegance. Born out of a passion for fashion that effortlessly blends
            comfort with trendsetting designs, Casual City is your go-to
            destination for curated collections of hats, sunglasses, and
            sneakers.
          </p>
        </div>
      </div>

      <div className="row align-items-center flex-wrap-reverse">
        <div className="col">
          <p>
            Our mission is to empower individuals to express their unique sense
            of style through versatile and comfortable fashion essentials.
          </p>
        </div>
        <div className="col">
          <img className="rounded aboutImg shadow" src={sunGlassImg} alt="" />
        </div>
      </div>
      <div className="row align-items-center my-5">
      <div className="col">
          <img className="rounded aboutImg shadow" src={sneakersImg} alt="" />
        </div>
        <div className="col">
          <p>
          From
              timeless classics to the latest streetwear trends, Casual City offers
              a carefully curated selection that caters to the diverse tastes of our
              fashion-forward community. Step into our world and discover the
              perfect blend of casual chic, where every accessory and footwear tells
              a story of comfort, confidence, and individuality. Welcome to Casual
              City – where fashion meets leisure in the heart of urban living
          </p>
        </div>
       
      </div>
    </section>
  );
};

export default About;
