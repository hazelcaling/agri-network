import "./AboutMe.css"

export default function AboutMe() {
  return (
    <div className="about-me">
      <div className="about-me-content">
        <h2>About Me</h2>
        <img
          src="doraemon.jpg"
          alt="Profile Picture"
        />
        <p>
          Hello! My name is Hazel Caling, a passionate software engineering
          student nearing graduation from the App Academy.
        </p>
        <p>
          Besides coding, I love hiking with my dogs, exploring new trails, and
          capturing beautiful moments in nature. I believe in continuous
          learning and aim to contribute positively to the tech community.
        </p>
        <p>
          Let&apos;s connect on{" "}
          <a
            href="https://www.linkedin.com/in/hazel-c-37255a59/"
            target="blank"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  )
}
