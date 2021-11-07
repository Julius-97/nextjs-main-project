import Image from 'next/image';

import classes from './hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/max.png'
          alt='An image showing me'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Giulio</h1>
      <p>
        I blog about web development - expecially frontend frameworks like
        Angular or React.
      </p>
    </section>
  );
};

export default Hero;
