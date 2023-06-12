import GitHubIcon from "../assets/images/github.svg";

function Footer() {
  return (
    <div className="absolute bottom-6 right-1/2 translate-x-1/2 md:right-6 md:top-2">
      <a
        href="https://github.com/Debbl/bubble-wrap"
        target="_blank"
        rel="noreferrer"
      >
        <img src={GitHubIcon} />
      </a>
    </div>
  );
}

export default Footer;
