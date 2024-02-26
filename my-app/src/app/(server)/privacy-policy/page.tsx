import React from "react";

const page = () => {
  return (
    <div className="p-10 flex flex-col gap-3">
      <h1 className="text-4xl">
        {`Privacy Policy and Steps to Delete your Account and Associated Data`}
      </h1>
      <p>{`The Reading Club Privacy Policy`}</p>
      <p>
        {`The Reading Club is an application developed and maintained by the The
        Reading Club team. In The Reading Club, we ("we", "The Reading Club
        team") are comitted to creating a safe environment. We use any data we
        collect only to provide you with a better experience, and do not sell
        any data to third parties.`}
      </p>
      <p>
        {` We may only collect the email address from a parent ("parent" or "you");
        you child's first name (we recommend a nickname) and age; and usage
        statistics. We do not ask for or collect any additional personal
        information.`}
      </p>
      <p>
        {`We use this information only to operate, maintain, and enhance the
        features inside The Reading Club app, which include personalizing your
        child's experience, communicating you about your child's progress, and
        providing you with personalized educational feedback.`}
      </p>
      <p>
        {`We may only share personal information if such is necessary to work with
        our trusted third party service providers, securily; other than that, we
        may only disclose personal information if such is necessary to satisfy
        any applicable law. We may revise and update this Privacy Policy and
        will notify you by stating an updated date on our website. Your
        continued use of The Reading Club app following such date constitutes
        your acceptance of the updated Privacy Policy.`}
      </p>
      <p>
        {` By downloading The Reading Club app, you agree to this Privacy Policy.`}
      </p>
      <p>Contacting The Reading Club</p>{" "}
      <p>By email: contact@thereadingclubapp.com</p>
      <h1 className="text-2xl">Delete your Account and Associated Data </h1>
      <ol className="list-decimal list-inside">
        {[
          "Go to settings inside of the app.",
          "Click on “Delete Account.”",
        ].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

export default page;
