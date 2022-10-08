import styles from "./Section.module.css";
import Image from "next/image";

interface SectionProps {
  children: any,
  header?:string,
  imgSrc?:string,
  reverse?:boolean,
  vertical?:boolean,
  divClassName?:string
}

const Section = ({
  children,
  header,
  imgSrc,
  reverse = false,
  vertical = false,
  divClassName
}:SectionProps) => {
  let className = `${styles.Section}`;
  if (reverse && !vertical)
    className += ` ${styles.SectionReversed}`;
  if (vertical && !reverse)
    className += ` ${styles.SectionVertical}`;
  if (vertical && reverse)
    className += ` ${styles.SectionVerticalReversed}`;

  return (
    <div className={`${className} ${divClassName}`}>
      {header && (
        <h2
          className={styles.sectionHeader}
        >
          {header}
        </h2>
      )}
      <div className={styles.mainContent}>
        <div
          className={
            !imgSrc
              ? `${styles.textContent} ${styles.textOnly}`
              : `${styles.textContent}`
          }
        >
          {children}
        </div>
        {imgSrc && (
          <div
            className={styles.imgContainer}
          >
            <Image src={imgSrc} layout="fill" priority={true} loading='eager' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
