import AdImage1 from "../../../assets/images/ads1.jpg";
import AdImage2 from "../../../assets/images/digital-ads.jpg";
import firstbankAd from "../../../assets/images/homepage/first_bank.jpg";

import "./index.css";

const ContactsAds = () => {
  return (
    <div className="ads_contact">
      <div className="ads_contact-img">
        <img loading="lazy" src={AdImage1} alt="ad1" />
      </div>
      <div className="ads_contact-img">
        <img loading="lazy" src={AdImage2} alt="ad1" />
      </div>
    </div>
  );
};

export const ContactsAds1 = () => {
  return (
    <div className="ads_contact">
      <div className="ads_contact-img">
        <img loading="lazy" src={firstbankAd} alt="ad1" />
      </div>
      {/* <div className="ads_contact-img">
        <img loading="lazy" src={AdImage2} alt="ad1" />
      </div> */}
    </div>
  );
};

export default ContactsAds;
