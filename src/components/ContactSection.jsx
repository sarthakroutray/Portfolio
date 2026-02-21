function ContactSection({ form, handleChange, handleSubmit, error, loading }) {
  return (
    <section id="contact" className="container mx-auto px-6 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-paper-gray border-4 border-ink-black p-4 sm:p-8 shadow-cutout">
          <p className="font-mono text-sm uppercase tracking-[0.25em] mb-2">Get in touch</p>
          <h3 className="font-display text-5xl uppercase mb-8">Contact</h3>
          <p className="font-mono text-sm border-l-4 border-sharpie-blue pl-3 mb-6">
            Open to AI/ML internships and backend engineering roles.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue"
            />
            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue resize-none"
            />

            {error && <div className="text-red-700 font-mono text-sm">{error}</div>}

            <button
              type="submit"
              className="w-fit px-6 py-3 bg-sharpie-blue text-white border-2 border-ink-black font-mono font-bold hover:bg-ink-black transition-colors"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <div className="bg-white border-4 border-ink-black p-4 sm:p-8 shadow-cutout flex flex-col justify-between">
          <div>
            <h4 className="font-ransom text-4xl mb-6">CONNECT</h4>
            <p className="font-mono mb-6">
              I am open to internship roles where I can own backend and AI workflow implementation and ship features used by real users.
            </p>
            <div className="space-y-4 font-mono">
              <a
                href="https://github.com/sarthakroutray"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-sharpie-blue"
              >
                GitHub: @sarthakroutray
              </a>
              <a
                href="https://www.linkedin.com/in/sarthak-routray-020583323/"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-sharpie-blue"
              >
                LinkedIn: Sarthak Routray
              </a>
              <a href="mailto:sarthak.routray2006@gmail.com" className="block hover:text-sharpie-blue">
                Email: sarthak.routray2006@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
