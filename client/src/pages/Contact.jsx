import { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import useTitle from '../hooks/useTitle';
import { Mail, User, MessageSquare, Send, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  useTitle('Contact');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      return toast.error('Please fill in all fields');
    }
    setLoading(true);
    try {
      await api.post('/api/contacts', form);
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Info */}
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-gray-900 dark:text-white">Contact Information</h2>
            {[
              { icon: <Mail className="text-blue-500" size={20} />, label: 'Email', value: 'support@modelhub.ai' },
              { icon: <Phone className="text-blue-500" size={20} />, label: 'Phone', value: '+1 (555) 000-0000' },
              { icon: <MapPin className="text-blue-500" size={20} />, label: 'Location', value: 'San Francisco, CA, USA' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="mt-0.5">{icon}</div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label" htmlFor="name"><span className="label-text font-semibold text-sm">Full Name</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
                      placeholder="John Doe"
                      className="input input-bordered w-full h-11 pl-10 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="email"><span className="label-text font-semibold text-sm">Email Address</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className="input input-bordered w-full h-11 pl-10 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label" htmlFor="subject"><span className="label-text font-semibold text-sm">Subject</span></label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange}
                    placeholder="How can we help?"
                    className="input input-bordered w-full h-11 pl-10 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
                </div>
              </div>

              <div className="form-control">
                <label className="label" htmlFor="message"><span className="label-text font-semibold text-sm">Message</span></label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell us more about your question..."
                  rows={5}
                  className="textarea textarea-bordered w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-900 resize-none p-4" required />
              </div>

              <button type="submit" disabled={loading}
                className="btn btn-primary w-full h-12 rounded-xl font-bold text-sm">
                {loading ? <span className="loading loading-spinner loading-sm" /> : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;