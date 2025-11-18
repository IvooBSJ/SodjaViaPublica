"use client"

import { useState, useEffect } from "react"
import React, { useRef } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Menu, X, ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import emailjs from '@emailjs/browser'


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0) 
  
  // Funcionalidades del contacto
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!form.current) return;
    
    emailjs
      .sendForm('prueba1',
      'template_1alftpt', 
      form.current, {
        publicKey: 'VarAhstFGiGxjqonR', 
      })
      
      .then(() => {
        alert('Mensaje enviado correctamente'); 
      })
      .catch(() => {
        alert('Error al enviar el mensaje');
      });
    };

  // Texto incorrecto ingresado en el fomulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  // Controles para el telefono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite: + opcional al inicio y números
    const cleanedValue = value.replace(/[^0-9+]/g, '');
    
    // Valida que el + solo esté al inicio (si existe)
    const isValid = /^\+?[0-9]*$/.test(cleanedValue);
    
    setFormData(prev => ({
      ...prev,
      phone: cleanedValue
    }));
  }
  const botonTelefono = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite: teclas de control, números y +
    const isAllowedKey = (/[0-9+]/.test(e.key) || 
        ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)
    );
      
    if (!isAllowedKey) {
      e.preventDefault();
    }
  }
  

  const cambiodeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const caracteresPro = /[\/<>]/;
    const hasInvalidChars = caracteresPro.test(value);

    setErrors(prev => ({
      ...prev,
      [name]: hasInvalidChars ? 'No se permiten los caracteres /, <, o >' : ''
    }));

    const cleanedValue = value.replace(caracteresPro, '');
    setFormData(prev => ({
      ...prev,
      [name]: cleanedValue
    }));

    if (hasInvalidChars && e.target instanceof HTMLTextAreaElement) {
      e.target.value = cleanedValue;
    }
  }
 //

  const slides = [
    {
      image: "/images/billboard1.jpg",
      title: "Impacto visual garantizado",
      subtitle: "Vallas publicitarias en ubicaciones estratégicas",
    },
    {
      image: "/images/billboard2.jpg",
      title: "Lleva tu marca a otro nivel",
      subtitle: "Publicidad exterior de alto impacto",
    },
    {
      image: "/images/billboard3.jpg",
      title: "Presencia en las principales vías",
      subtitle: "Maximiza la visibilidad de tu marca",
    },
  ]

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const services = [
    {
      title: "Vallas Publicitarias",
      description: "Impacto visual garantizado en las principales vías de circulación",
      image: "/images/sextuples.jpg",
      features: ["Alta visibilidad", "Diferentes formatos", "Ubicaciones estratégicas"],
    },
    {
      title: "Pantallas LED",
      description: "Publicidad dinámica con contenido actualizable en tiempo real",
      image: "/images/pantallas-led.jpg",
      features: ["Publicidad dinámica", "Alto impacto visual", "Ubicaciones premium"],
    },
    {
      title: "Publicidad en Transporte",
      description: "Tu marca en movimiento por toda la ciudad",
      image: "/images/publicidad-transporte.jpg",
      features: ["Amplia cobertura", "Diferentes formatos", "Alta frecuencia de impactos"],
    },
    {
      title: "Carteles en Ciudad",
      description: "Presencia urbana en puntos estratégicos de alto tránsito",
      image: "/images/carteles-ciudad.jpg",
      features: ["Ubicaciones céntricas", "Formatos variados", "Impacto local"],
    },
    {
      title: "Carteleras Ruteras",
      description: "Visibilidad en rutas y accesos a ciudades",
      image: "/images/carteleras-ruteras.jpg",
      features: ["Gran formato", "Audiencia en tránsito", "Cobertura regional en el NEA"],
    },
    {
      title: "Hipervallas",
      description: "Formatos de gran tamaño para máximo impacto",
      image: "/images/hipervallas.jpg",
      features: ["Formato gigante", "Imposible de ignorar", "Ubicaciones exclusivas"],
    },
  ]

  const additionalProjects = [
    {
      title: "Campaña Navideña",
      client: "Tienda Departamental",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Lanzamiento App",
      client: "Startup Tecnológica",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Promoción Turística",
      client: "Secretaría de Turismo",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Evento Corporativo",
      client: "Multinacional",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Campaña de Conciencia",
      client: "ONG Ambiental",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Festival Cultural",
      client: "Municipalidad",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center" >
              <Image src="/images/logo.jpg" alt="Sodja Via Publica Loho" width={50} height={50} className="mr-2"/>
              <span className="text-xl font-bold text-red-600 hidden md:inline">SODJA VIA PUBLICA</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-800 hover:text-red-600 transition-colors">
                Inicio
              </a>
              <a href="#servicios" className="text-gray-800 hover:text-red-600 transition-colors">
                Servicios
              </a>
              <a href="#proyectos" className="text-gray-800 hover:text-red-600 transition-colors">
                Proyectos
              </a>
              <a href="#ubicaciones" className="text-gray-800 hover:text-red-600 transition-colors">
                Ubicaciones
              </a>
              <a href="#contacto" className="text-gray-800 hover:text-red-600 transition-colors">
                Contacto
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white py-4 px-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#inicio"
                  className="text-gray-800 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </a>
                <a
                  href="#servicios"
                  className="text-gray-800 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servicios
                </a>
                <a
                  href="#proyectos"
                  className="text-gray-800 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Proyectos
                </a>
                <a
                  href="#ubicaciones"
                  className="text-gray-800 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ubicaciones
                </a>
                <a
                  href="#contacto"
                  className="text-gray-800 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 md:pt-0 relative h-screen">
        {/* Slider */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.image || "/placeholder.svg?height=1080&width=1920"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">{slides[currentSlide].subtitle}</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#servicios">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                    Nuestros Servicios <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#contacto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white hover:bg-white hover:text-black"
                  >
                    Contactanos
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-red-600" : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-red-600 mb-2">15+</p>
              <p className="text-gray-600">Años de experiencia</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-red-600 mb-2">200+</p>
              <p className="text-gray-600">Ubicaciones disponibles</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-red-600 mb-2">300+</p>
              <p className="text-gray-600">Clientes satisfechos</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-red-600 mb-2">1000+</p>
              <p className="text-gray-600">Campañas exitosas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seccion de Servicios */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones publicitarias de alto impacto para que tu marca destaque en el entorno urbano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg?height=400&width=600"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-red-600">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="h-4 w-4 text-red-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trabajos Destacados</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce algunos de nuestros trabajos más exitosos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-lg shadow-md h-80">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Campaña Verano 2023"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">Campaña Verano 2023</h3>
                <p className="text-gray-300">Empresa de Bebidas</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md h-80">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Lanzamiento Producto"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">Lanzamiento Producto</h3>
                <p className="text-gray-300">Marca de Tecnología</p>
                
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-md h-80">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Campaña Institucional"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">Campaña Institucional</h3>
                <p className="text-gray-300">Entidad Bancaria</p>
                
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  Ver mas trabajos
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-5xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-6">Trabajos Varios</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {additionalProjects.map((project, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg shadow-md h-64">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white text-lg font-bold">{project.title}</h3>
                        <p className="text-gray-300 text-sm">{project.client}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Redireccion contacto Seccion */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para destacar tu marca?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contáctanos hoy mismo y descubre cómo podemos ayudarte a crear una campaña publicitaria de alto impacto.
          </p>
          <a href="#contacto">
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-red">
              Solicitar presupuesto
            </Button>
          </a>
        </div>
      </section>

      {/* Locations Section */}
      <section id="ubicaciones" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Ubicaciones</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contamos con una fabrica y una oficina comercial, donde atendemos si se pone en contacto con nosotros para coordinar una cita.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="mb-4 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.2043445453082!2d-58.94369321870893!3d-27.49199247090617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cf304624299%3A0xd9a0a757463bfc5b!2sSodja%20Letreros!5e0!3m2!1ses-419!2sar!4v1723831756082!5m2!1ses-419!2sar"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Fábrica en Parque Industrial</h3>
                <p className="text-gray-600 mb-4 flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Parque Industrial Ucal, Nicolas Acosta 200, Barranqueras, Chaco</span>
                </p>
                <a
                  href="https://www.google.com/maps/place/Sodja+Letreros/@-27.4919925,-58.9436932,17z/data=!3m1!4b1!4m5!3m4!1s0x94450cf304624299:0xd9a0a757463bfc5b!8m2!3d-27.4919973!4d-58.9415045" 
                  target="_blank" 
                  rel="noopener noreferrer"
                ></a>
                <Button variant="link" className="text-red-600 p-0">
                  Ver ubicación <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="mb-4 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.27126890012744!2d-58.99205076353399!3d-27.458663068223476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c8d7da2292f%3A0x4122de3ba5f7d87a!2sAv.%20Castelli%20191%2C%20H3500BHB%20Resistencia%2C%20Chaco!5e0!3m2!1ses!2sar!4v1723825054651!5m2!1ses!2sar"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Oficina</h3>
                <p className="text-gray-600 mb-4 flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Av. Castelli 175, Resistencia, Chaco</span>
                </p>
                <a
                  href="https://maps.app.goo.gl/edsMTDii3MnRUsPs7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                ></a>
                <Button variant="link" className="text-red-600 p-0">
                  Ver ubicación <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

{/* Por si despues quiero anadir un mapa con las ubicaciones en cambio
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Mapa de ubicaciones"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Fábrica en Parque Industrial</h3>
                <p className="text-gray-600 mb-4 flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Parque Industrial Ucal, Nicolas Acosta 200, Barranqueras, Chaco</span>
                </p>
                <Button variant="link" className="text-red-600 p-0">
                  Ver ubicación <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Mapa de ubicaciones urbanas"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Oficina Comercial</h3>
                <p className="text-gray-600 mb-4 flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Av. Castelli 175, Resistencia, Chaco</span>
                </p>
                <Button variant="link" className="text-red-600 p-0">
                  Ver ubicación <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Contacto Seccion */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos listos para ayudarte a crear una campaña publicitaria de alto impacto. Completa el formulario y
              nos pondremos en contacto contigo a la brevedad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
            <form ref={form} onSubmit={sendEmail} id="form" className="space-y-6">
              {/* Campos ocultos */}
              <input type="hidden" name="_next" value="false" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <Input id="name" name="name" placeholder="Tu nombre" value={formData.name} onChange={cambiodeInput} className={`w-full rounded-md border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } p-2 focus:outline-none focus:ring-2 focus:ring-red-600`} />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <Input id="company" name="company" placeholder="Nombre de tu empresa" value={formData.company} onChange={cambiodeInput} className={`w-full rounded-md border ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    } p-2 focus:outline-none focus:ring-2 focus:ring-red-600`}/>
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" name="email" placeholder="tu@email.com" required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" value={formData.email} onChange={cambiodeInput} className={`w-full rounded-md border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } p-2 focus:outline-none focus:ring-2 focus:ring-red-600`}/>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1" >
                    Teléfono
                  </label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange} onKeyDown={botonTelefono} placeholder="XXX XXX XXXX"
                    className={`w-full rounded-md border ${
                      formData.phone && !/^\+?[0-9]+$/.test(formData.phone) 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    } p-2 focus:outline-none focus:ring-2 focus:ring-red-600`}
                  />
                  {formData.phone && !/^\+?[0-9]+$/.test(formData.phone) && (
                    <p className="mt-1 text-sm text-red-600">
                      Solo se permiten números y el símbolo + al inicio!
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Servicio de interés
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="Vallas Publicitarias">Vallas Publicitarias</option>
                  <option value="Hipervallas">Hipervallas</option>
                  <option value="Pantallas LED">Pantallas LED</option>
                  <option value="Publicidad en Transporte">Publicidad en Transporte</option>
                  <option value="Carteles en ciudad">Carteles en Ciudad</option>
                  <option value="Carteleras Ruteras">Carteleras Ruteras</option>
                  <option value="Otros">Otros...</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <Textarea id="message" name="message" placeholder="Cuéntanos sobre tu proyecto o consulta" value={formData.message}
                onChange={cambiodeInput} rows={5} className={`w-full rounded-md border ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } p-2 focus:outline-none focus:ring-2 focus:ring-red-600`} />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                Enviar mensaje
              </Button>
            </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Información de contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-gray-600">+54 362 4531414</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">sodjaletreros@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Oficina Comercial</p>
                      <p className="text-gray-600">Av. Castelli 175, Resistencia, Chaco</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Fábrica</p>
                      <p className="text-gray-600">Parque Industrial Ucal, Nicolas Acosta 200, Barranqueras, Chaco</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Horario de atención</p>
                      <p className="text-gray-600">Lunes a Viernes de 9:00 a 18:00 hs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Síguenos en redes sociales</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/people/SODJA-Via-Publica/100063490182954/" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/sodjaviapublica/" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
          
      {/* Footer */}
      <Footer />
    </div>
  );
}