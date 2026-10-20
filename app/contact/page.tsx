import { ContactForm } from '@/components/contact-form';
import { business } from '@/config/business';

export const metadata = {
  title: 'Contact | Request a Quote',
};

export default function ContactPage() {
  return (
    <main className="section contact-section">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Contact the team</p>
          <h1 className="page-title">Let’s talk about your job.</h1>
          <p className="page-lead">
            Call {business.phone} or use the form to send through a few
            details.
          </p>
        </div>

        <div className="form-card">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}