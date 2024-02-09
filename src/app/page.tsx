import Chat from "./chat/page";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="page-container">
        <h1 className="title">Attentive Company Kick-off 2024 THE RPG</h1>
        <div className="text-box">
          <p>You are a slightly drunk Attentive employee at your company kick off in 2024 and you&apos;re down 200 bucks, you&apos;re slightly tired, and some of your colleagues still respect you.</p>
          <p>Check out is in 10 hours, and you&apos;re not sure how you want to spend your time yet. You enter the casino and you see a very loud and happy craps table.</p>
        </div>
          <Chat />
      </div>
    </div>
  );
}

