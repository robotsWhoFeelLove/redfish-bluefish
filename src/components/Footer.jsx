import "./Begin/waves.css";

function Footer() {
  return (
    <div className="content flex-class">
      <a
        className="underline text-slate-400 absolute top-0 right-14 text-xs"
        href="https://github.com/robotsWhoFeelLove/onefish-twofish?tab=readme-ov-file"
      >
        powered by oneFish-twoFish
      </a>
      <span className="underline decoration-red">Red</span>Fish-<span className="underline decoration-blue-400">Blue</span>Fish|&nbsp; &#169;{" "}
      {new Date().getFullYear()}{" "}
    </div>
  );
}

export default Footer;
