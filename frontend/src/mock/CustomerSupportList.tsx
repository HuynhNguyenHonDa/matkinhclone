import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SyncIcon from "@mui/icons-material/Sync";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

export const customerSupportList = [
  {
    id: "1",
    title: "Chính Sách Bảo Hành",
    description: `
    Chúng tôi tự tin là đơn vị có chế độ hậu mãi tốt nhất Việt Nam khi áp
    dụng chính sách bảo hành hai năm và đổi trả sản phẩm không cần lí do
    trong 30 ngày. Chúng tôi có hệ thống dữ liệu được cập nhật liên tục và
    chính xác để dễ dàng tra cứu thông tin mua hàng.
    `,
    icon: <VerifiedUserIcon />,
  },
  {
    id: "2",
    title: "Khám mắt miễn phí",
    description: `
    Lily thực hiện đo khám mắt miễn phí cho khách hàng khi đặt lịch trước 24 tiếng. Với các bác sĩ chuyên khoa, trình độ chuyên môn cao. Tư vấn kính mắt phù với từng loại bệnh về mắt cho khách hàng.
    `,
    icon: <VisibilityIcon />,
  },
  {
    id: "3",
    title: "Thu cũ đổi mới",
    description: `
    Thay vì bỏ ra một số tiền lớn để mua kính mắt với dịch vụ “Thu Cũ Đổi Mới”- "GIẢM 10%" đơn hàng kính mắt của Lilyeyewear, quý khách hàng sẽ được hỗ trợ thu lại kính mắt cũ với giá cực kỳ ưu đãi và tiết kiệm chi phí nhất.
    `,
    icon: <SyncIcon />,
  },
  {
    id: "4",
    title: "Vệ sinh và bảo quản mắt kính",
    description: `
    Lily đã nhận biết được vấn đề này của mọi người, vậy nên hôm nay Lily sẽ hướng dẫn bạn cách lau chùi, vệ sinh chiếc kính của bạn thật sạch sẽ mỗi ngày, để có một tầm mình thật sáng rõ và tươi mới.
    `,
    icon: <CleaningServicesIcon />,
  },
];
