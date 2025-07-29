/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import ToggleSwitch from "./ToggleSwitch";

export default function AdditionalSetting({ onChange }: { onChange?: (data: any) => void }) {
  const [addReferPerson, setAddReferPerson] = useState(false);
  const [connectionTips, setConnectionTips] = useState("");
  const [mailTemplate, setMailTemplate] = useState("");
  const [followUpEmail, setFollowUpEmail] = useState("");

  useEffect(() => {
    onChange?.({
      addReferPerson,
      connectionTips,
      mailTemplate,
      followUpEmail,
    });
  }, [addReferPerson, connectionTips, mailTemplate, followUpEmail, onChange]);

  return (
    <>
      <div>
        <ToggleSwitch
          label="Add a Refer Person"
          initialState={addReferPerson}
          onChange={setAddReferPerson}
          className="mt-0 card-shadow px-5 sm:px-7 py-4 h-auto sm:h-[4.7rem] rounded-2xl card-shadow text-base font-montserrat sm:text-xl font-medium gap-2"
        />
      </div>
      {addReferPerson && (
        <div className="pt-4 border-gray-200 space-y-6">
          <RichTextEditor
            label="Connection Request Tips"
            placeholder="Start typing the Internship Description"
            value={connectionTips}
            onChange={setConnectionTips}
          />
          <RichTextEditor
            label="Mail Template"
            placeholder="Start typing the Internship Description"
            value={mailTemplate}
            onChange={setMailTemplate}
          />
          <RichTextEditor
            label="Follow-up Email"
            placeholder="Start typing the Internship Description"
            value={followUpEmail}
            onChange={setFollowUpEmail}
          />
        </div>
      )}
    </>
  );
}
