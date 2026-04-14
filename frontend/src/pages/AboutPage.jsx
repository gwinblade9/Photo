import React from 'react'
import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://www.kino-teatr.ru/news/28400/252845.jpg"
              alt="Photographer"
              className="rounded-2xl shadow-xl w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-light mb-6">Обо мне</h1>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Фотография — моя страсть, а Москва — мой дом. Я снимаю свадьбы, портреты и повседневную жизнь уже более 10 лет. За это время через мой объектив прошли сотни историй: я бережно фиксирую самые драгоценные мгновения для семей и влюблённых пар — моменты, которые останутся с ними навсегда.
              </p>
              <p>
                В своей работе я придерживаюсь документального стиля фотографии. Я убеждён(а), что ценность снимка — в искренних эмоциях и спонтанных моментах, а не в излишне постановочных кадрах. Каждая пара обладает своей уникальной историей любви, и моя задача — бережно рассказать её средствами визуального искусства, через объектив моей камеры.
              </p>
              <p>
                Если я не за камерой — значит, я где‑то гуляю по новым улицам и поглощаю очередную порцию кофеина.
              </p>
            </div>
            <div className="mt-8 flex space-x-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Instagram</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Facebook</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Pinterest</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage