import React from "react";
import { useChoose } from "../hooks/UI";
import { useSoundNotice } from "../hooks/window";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeUserSetting } from "../actions/user";
import { NoticeSound } from "../reducers/user.type";
import { RootState } from "../reducers";
import WrapJSON from "../components/WrapJSON";
import { usePrevious } from "../hooks/utils";

function SettingPage() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const [noticeSound, NoticeSound] = useChoose(
    [
      null,
      "bullfrog.ogg",
      "got-it-done.ogg",
      "horse-whinnies.ogg",
    ] as NoticeSound[],
    user.settings?.noticeSound || null,
    "radio",
    (c: NoticeSound) => {
      dispatch(changeUserSetting({ noticeSound: c }));
    }
  );

  const prevNoticeSound = usePrevious(noticeSound);
  useSoundNotice(
    `sounds/${noticeSound}`,
    Boolean(noticeSound) && noticeSound !== prevNoticeSound
  );

  return (
    <>
      <h2>Setting Page</h2>
      <Form>
        <Form.Group controlId="noticeSound">
          <Form.Label>Notification Sound</Form.Label>
          {NoticeSound}
        </Form.Group>
      </Form>
      <p>Prev: {prevNoticeSound}</p>
      <p>Now: {noticeSound}</p>
      <WrapJSON json={user} />
    </>
  );
}
export default SettingPage;
