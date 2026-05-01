import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, MapPin, User, Send } from 'lucide-react';

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to send the message.",
        className: "bg-red-50 border-red-500 text-red-900",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Using FormSubmit for zero-setup email sending
    fetch('https://formsubmit.co/ajax/manikandanak177@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _subject: formData.subject || "New contact form submission!" // Sets email subject
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          className: "bg-slate-50 border-green-500 text-slate-900",
        });
        
        // Clear form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    })
    .catch((error) => {
        console.error('Error:', error);
        toast({
          title: "Failed to Send Message",
          description: "Please try again later or email me directly at manikandanak177@gmail.com",
          className: "bg-red-50 border-red-500 text-red-900",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const contactInfo = [
    { icon: <Mail className="text-green-600" />, label: "Email", value: "manikandanak177@gmail.com", link: "mailto:manikandanak177@gmail.com" },
    { icon: <Phone className="text-emerald-600" />, label: "Phone", value: "88256 28288", link: "tel:8825628288" },
    { icon: <User className="text-green-600" />, label: "LinkedIn", value: "linkedin.com/in/manikandana177", link: "https://linkedin.com/in/manikandana177" },
    { icon: <MapPin className="text-emerald-600" />, label: "Location", value: "Kodambakkam, Chennai", link: null },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="section-label">06 / Contact</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-poppins mb-4 tracking-tight">Get In <span className="text-green-600">Touch</span></h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
          <p className="mt-6 text-green-700 max-w-2xl mx-auto font-medium">
            Have a project in mind or looking for a skilled UI/UX Developer & Data Analyst? 
            Feel free to contact me using the form below or via my contact details.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className={`reveal stagger-${idx + 1}`}>
                <Card className="glass-card premium-card hover-glow border-none group transition-all duration-500 shadow-sm">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-green-100 p-4 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-inner">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">{info.label}</p>
                      {info.link ? (
                        <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-green-950 hover:text-green-600 transition-colors font-bold">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-green-950 font-bold">{info.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 reveal stagger-3">
            <Card className="glass-card premium-card hover-glow border-none h-full shadow-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-green-950">Your Name</label>
                      <Input 
                        id="name" name="name" required
                        value={formData.name} onChange={handleChange}
                        className="bg-green-50/50 border-green-200 text-green-950 focus-visible:ring-green-500 focus-visible:border-green-500 h-12 rounded-xl"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-green-950">Your Email</label>
                      <Input 
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        className="bg-green-50/50 border-green-200 text-green-950 focus-visible:ring-green-500 focus-visible:border-green-500 h-12 rounded-xl"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-green-950">Subject</label>
                    <Input 
                      id="subject" name="subject" required
                      value={formData.subject} onChange={handleChange}
                      className="bg-green-50/50 border-green-200 text-green-950 focus-visible:ring-green-500 focus-visible:border-green-500 h-12 rounded-xl"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-green-950">Message</label>
                    <Textarea 
                      id="message" name="message" required
                      value={formData.message} onChange={handleChange}
                      className="bg-green-50/50 border-green-200 text-green-950 focus-visible:ring-green-500 focus-visible:border-green-500 min-h-[150px] resize-none rounded-xl"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-green-600 shadow-xl shadow-green-600/20 hover:-translate-y-1 hover:shadow-green-600/40 transition-all duration-300 hover:bg-green-500 text-white h-14 rounded-xl text-lg font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-5 w-5 animate-spin">⟳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
