const HomeContact = () => {
  return (
    <form>
      <div className="row">
        <div className="col-lg-6">
          <input type="text" placeholder="Enter Name" />
        </div>
        <div className="col-lg-6">
          <input type="email" placeholder="Enter Mail" />
        </div>
        <div className="col-lg-12">
          <textarea
            id="message"
            cols={30}
            rows={10}
            placeholder="Enter your message..."
          ></textarea>
        </div>
        <div className="ico-contact__btn text-center mt-10">
          <button className="thm-btn" type="submit">
            send message
          </button>
        </div>
      </div>
    </form>
  );
};

export default HomeContact;
