import CancelPanel from "@/app/components/CancelPanel";
import BookingInformation from "@/app/components/BookingInformation";
import { MdArrowBack } from "react-icons/md";

const Cancel = () => {
  return (
    <section className="section section-a">
      <div>
        <a
          href=""
          className={`link`}
          style={{
            marginTop: "-1.625rem",
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            position: "relative",
          }}
        >
          <MdArrowBack style={{ height: "1.25rem", width: "auto" }} /> Atrás
        </a>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "7.1875rem",
          }}
        >
          <CancelPanel />
          <BookingInformation />
        </div>
      </div>
    </section>
  );
};

export default Cancel;
