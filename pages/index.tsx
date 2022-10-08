import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { TimerContainer } from '../components/TimerContainer'
import { Header } from '../components/Header'
import Confetti from 'react-confetti'
import Section from '../components/Section'
import { gsap } from 'gsap'

const Home: NextPage = () => {

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [partyTime, setPartyTime] = useState<boolean>(false);
  const [confettiTime, setConfettiTime] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const Timer = useRef(null);

  useEffect(() => {
    const target = new Date("10/08/2022 23:59:59");
    // const target = new Date("10/08/2022 16:55:30");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        clearInterval(interval)
        // setPartyTime(true);
        setConfettiTime(true);
        showContent();
        const confettiTimeout = setTimeout(() => setConfettiTime(false), 5000)
      }
    }, 1000);

    if(typeof window !== "undefined") {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    }

    return () => clearInterval(interval);
  }, []);

  const showContent = () => {
    if(Timer) gsap.to(Timer.current, {yPercent: '-150'}).then(() => setPartyTime(true))
  }

  return (
    <>
    <Confetti numberOfPieces={confettiTime?200:0} height={height} width={width} />
    <div className="flex min-h-screen min-w-full flex-col items-center bg-[#2f3642] fixed top-0 z-50" ref={Timer}>
      <Head>
        <title>Time left till magic</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Header message={"Time Left till Magic"} />

      <TimerContainer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </div>
      <Section header="Happy Birthday!" imgSrc="/bday.png">
        <p>Happy Birthday to one of the cutest most beautiful girl on earth!!<br/> I kid you not when I say I still can't believe I know someone as awesome as you! Not only that you actually exist but YOU HAVE BEEN EXISTING FOR EIGHTEEN FREAKIN YEARS!?!!! That&apos;s just amazing to think about! </p>
      </Section>
      <Section imgSrc="/bday2.png" reverse>
        <p>Since you are now officially an adult I have to stop calling you tiny which tbh sucks 😒. But I sure you'll do lots of amazing things now since you're officially a "Biggie Girl" (You are not 😂). Just enjoy your bday knowing you'll always be tiny 😉</p>
        <p>PS: No getting drunk today 🙄</p>
      </Section>
      <Section imgSrc='/poem.jpg'>
        <p>Last but not the least this poem. Nothing else can describe how I feel for you.</p>
      </Section>
    </>
  )
}

export default Home
