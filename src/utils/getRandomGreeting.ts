/**
 * Returns a random greeting message to inspire productivity.
 * @returns {string} A random greeting message.
 */
export const getRandomGreeting = (): string => {
  const hoursLeft = 24 - new Date().getHours();

  const greetingsText: string[] = [
    "Smile Make's your days younger :)",
    "Get things done and conquer the day!",
    "Usaha Tidak akan menghianati hasil!",
    "Jangan Hanya Di Mimpikan, Tapi Wujudkan",
    "Today is a new opportunity to be productive!",
    "Sesuatu yang hilang darimu akan kembali dengan bentuk yang lain",
    "Sebaik-baiknya manusia, adalah manusia yang bermanfaat bagi manusia lain",
    "Tuhan TAU apa yang kamu impikan, jadi Tenang Lah",
    "EAT,SLEEP,CODING REPEAT",
    "Productivity is the key to success.",
    "Jatuh cinta adalah hal yang mudah, yang susah adalah menemukan tempat yang tepat untuk jatuh cinta",
    "Start small, achieve big.",
    "Be efficient, be productive.",
    "Allah Tahu Kamu Sudah Berusaha",
    "AKU MENYERAH! AKUU?MENYERAH? Oh Tentu Tidak",

    `Have a wonderful  ${new Date().toLocaleDateString("en", {
      weekday: "long",
    })}!`,
    `Happy ${new Date().toLocaleDateString("en", {
      month: "long",
    })}! A great month for productivity!`,
    hoursLeft > 4
      ? `${hoursLeft} hours left in the day. Gunakan Dengan Tepat agar tak menyesal!`
      : `Only ${hoursLeft} hours left in the day`,

    // <TextWithEmoji emojiStyle={emojiStyle} unified="1f5d3-fe0f">
    //   Start your day with a plan!
    // </TextWithEmoji>,
    // <TextWithEmoji emojiStyle={emojiStyle} unified="1f3af">
    //   Stay focused, stay productive.
    // </TextWithEmoji>,
    // <TextWithEmoji emojiStyle={emojiStyle} unified="1f513">
    //   Unlock your productivity potential.
    // </TextWithEmoji>,
    // <TextWithEmoji emojiStyle={emojiStyle} unified="2705">
    //   Turn your to-do list into a to-done list!
    // </TextWithEmoji>,
  ];

  const randomIndex = Math.floor(Math.random() * greetingsText.length);
  return greetingsText[randomIndex];
};

// interface EmojiTextProps {
//   children: ReactNode;
//   emojiStyle: EmojiStyle;
//   unified: string;
// }

// const TextWithEmoji = ({ children, emojiStyle, unified }: EmojiTextProps) => {
//   return (
//     <span style={{ display: "flex", alignItems: "center" }}>
//       {children}&nbsp;
//       <Emoji emojiStyle={emojiStyle} unified={unified} size={20} />
//     </span>
//   );
// };
