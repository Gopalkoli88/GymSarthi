import MemberSidePanel from "./MemberSidePanel";
import MemberProfile from "./MemberProfile";

import "react-toastify/dist/ReactToastify.css";

const MemberDashboardNew = () => {
  return (
    <div>
      <MemberSidePanel>
        <MemberProfile />
      </MemberSidePanel>
    </div>
  );
};

export default MemberDashboardNew;
