import GitHubIcon from "../assets/images/github.svg";

function Footer() {
  return (
    <div className=" absolute right-2 top-2">
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
