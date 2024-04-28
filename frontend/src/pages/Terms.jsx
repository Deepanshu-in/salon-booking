const Terms = () => {
  return (
    <div className="flex justify-center">
      <div className="terms-container h-[700px] w-[900px] border border-black rounded-md p-4 overflow-auto m-4">
        <h2 className="text-[24px] leading-7 font-semibold">
          Terms and Conditions :
        </h2>
        <ol className="mt-1 px-4">
          <li className="mt-2">
            <strong>Introduction</strong>
            <p>
              Welcome to StylesAtEase! These terms and conditions govern your
              use of our website; by using our website, you accept these terms
              and conditions in full. If you disagree with these terms and
              conditions or any part of these terms and conditions, you must not
              use our website.
            </p>
          </li>
          <li className="mt-2">
            <strong>Appointment Booking</strong>
            <p>
              StylesAtEase provides a platform for users to book appointments
              with barbershops and salons.
            </p>
            <p>
              By booking an appointment through StylesAtEase, you agree to abide
              by the policies and procedures of the respective barbershop or
              salon.
            </p>
            <p>
              All bookings are subject to availability, and StylesAtEase does
              not guarantee the availability of any specific appointment time or
              date.
            </p>
          </li>
          <li className="mt-2">
            <strong>User Accounts</strong>
            <p>
              To book appointments through StylesAtEase, you may need to create
              a user account.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password and for restricting access to your computer,
              and you agree to accept responsibility for all activities that
              occur under your account or password.
            </p>
            <p>
              StylesAtEase reserves the right to refuse service, terminate
              accounts, remove or edit content, or cancel appointments in its
              sole discretion.
            </p>
          </li>
          <li className="mt-2">
            <strong>Payments</strong>
            <p>
              Payment for appointments booked through StylesAtEase is processed
              securely through our payment gateway.
            </p>
            <p>
              All prices for services displayed on StylesAtEase are subject to
              change without notice, and StylesAtEase does not guarantee the
              accuracy of pricing information.
            </p>
            <p>
              Refunds may be issued in accordance with the refund policy of the
              respective barbershop or salon.
            </p>
          </li>
          <li className="mt-2">
            <strong>Cancellation and Rescheduling</strong>
            <p>
              Users may cancel or reschedule appointments through StylesAtEase,
              subject to the cancellation and rescheduling policy of the
              respective barbershop or salon.
            </p>
            <p>
              StylesAtEase is not responsible for any fees or charges incurred
              due to cancellation or rescheduling of appointments.
            </p>
          </li>
          <li className="mt-2">
            <strong>Liability</strong>
            <p>
              StylesAtEase does not provide any warranties or guarantees
              regarding the quality of services provided by the barbershops or
              salons listed on our website.
            </p>
            <p>
              StylesAtEase shall not be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising
              out of your use of or inability to use our website or services.
            </p>
          </li>
          <li className="mt-2">
            <strong>User Conduct</strong>
            <p>
              Users agree to use StylesAtEase for lawful purposes only and not
              to upload, post, or transmit any material that violates the rights
              of others or is unlawful, abusive, defamatory, obscene, or
              otherwise objectionable.
            </p>
            <p>
              Users agree not to use any automated means, including robots,
              spiders, or scrapers, to access or collect information from
              StylesAtEase.
            </p>
          </li>
          <li className="mt-2">
            <strong>Modifications</strong>
            <p>
              StylesAtEase reserves the right to modify or revise these terms
              and conditions at any time without prior notice. By continuing to
              use our website after such changes, you agree to be bound by the
              revised terms and conditions.
            </p>
          </li>
          {/* <li>
            <strong>Governing Law</strong>
            <p>
              These terms and conditions shall be governed by and construed in
              accordance with the laws of [Your Jurisdiction], and any disputes
              relating to these terms and conditions shall be subject to the
              exclusive jurisdiction of the courts of [Your Jurisdiction].
            </p>
          </li> */}
          <li className="mt-2">
            <strong>Contact Us</strong>
            <p>
              If you have any questions about these terms and conditions, please
              contact us at dipanshugupta921@gmail.com.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Terms;
