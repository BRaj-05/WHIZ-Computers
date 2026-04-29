import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <Card className="p-8" hover={false}>
          <Badge>Contact</Badge>
          <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">Talk to our admissions team</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Get fee details, batch timing, and course recommendations based on your goal.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Full name"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30 sm:col-span-2"
            />
            <textarea
              rows="4"
              placeholder="Tell us what you want to learn"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30 sm:col-span-2"
            />
          </div>

          <div className="mt-6">
            <Button>Request callback</Button>
          </div>
        </Card>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white">Visit us</h3>
          <p className="mt-4 leading-8 text-slate-300">
            Fraser Road, Patna, Bihar 800001
            <br />
            +91 99999 00000
            <br />
            hello@whizzcomputer.com
          </p>

          <div className="mt-8 space-y-4 text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">Mon to Sat: 8:00 AM - 8:00 PM</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">Offline + Online classes available</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">Career counseling included</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
