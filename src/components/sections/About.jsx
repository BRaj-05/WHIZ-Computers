import Card from '../ui/Card';
import Badge from '../ui/Badge';

const FEATURES = [
  {
    title: 'Industry-aligned curriculum',
    description: 'Course flow built with real job tasks, not only theory.',
  },
  {
    title: 'Mentor feedback loops',
    description: 'Weekly review cycles keep students consistent and confident.',
  },
  {
    title: 'Placement-focused support',
    description: 'Portfolio, resume, and interview preparation in one track.',
  },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <Badge>Why us</Badge>
          <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
            Designed like a modern product,
            <span className="text-gradient"> delivered like a great institute</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Whizz Computer combines the structure of classroom learning with the clarity and pace of modern online products.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
