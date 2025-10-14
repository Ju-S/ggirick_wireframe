
import MailSidebar from "../commons/components/mail/MailSidebar.jsx";
import MailList from "../commons/components/mail/MailList.jsx";
import ChatPage from "./ChatPage.jsx";


export default function MailPage() {
  return (<div className="flex h-screen p-4 pt-20 md:ml-64 bg-gray-50">
      {/* 메일 사이드바*/}
      <MailSidebar />

      {/* 메일 리스트 공간*/}
      <MailList />

    </div>
  );
}