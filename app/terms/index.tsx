import StyledText from "../../components/StyledText";
import { StyleSheet, View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import useScreenMode from "../../utilities/screenMode";
import { Colors } from "../../constants/Colors";

export default function Therms() {

  const { mode } = useScreenMode()

  const headerTitle = () => <StyledText litle bold mayus>TÉRMINOS</StyledText>

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => headerTitle(),
          headerRight: () => null,
        }}
      />
      <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <ScrollView style={{marginBottom: 20}}>
            <View>
              <StyledText title bold mayus justify>Términos de uso</StyledText>
              <StyledText xsmall justify>Si resides fuera de Estados Unidos, se aplican estas Condiciones de Uso.</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>Sumario</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>Hola. Te recomendamos que leas estas Condiciones de uso en su totalidad, ya que se aplicarán cada vez que accedas a BledBonds y utilices cualquiera de sus funciones. No obstante, si alguna vez necesitas que te recordemos los puntos principales, aquí tienes un breve resumen:</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>1.- No puedes acceder a BledBonds si eres menor de 18 años, ya que es un lugar de encuentro para adultos.</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>2.- No nos hacemos responsables de nada de lo que publiques o digas en BledBonds y no asumimos ninguna obligación de supervisar el contenido del sitio, pero si vemos o alguien nos informa de que has publicado algo que consideramos inapropiado, nos reservamos el derecho a eliminarlo.</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>3.- BledBonds no se hará responsable si publicas contenido que pertenece a otra persona y esta se molesta (o incluso implica a sus abogados). Es más, la responsabilidad de todo lo que publiques recaerá directamente sobre ti.</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>4.- Lee nuestras Normas de la comunidad y consejos de seguridad detenidamente para obtener información sobre lo que puedes y no puedes hacer.</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>5.- Si te preocupa como BledBonds  utiliza tus datos, te recomendamos que leas nuestra Política de privacidad, en la que se explica cómo tratamos tus datos personales y protegemos tu privacidad cuando usas BledBonds. Al usar BledBonds, aceptas que podamos usar dichos datos conforme a nuestra Política de privacidad. Si deseas obtener más información sobre las cookies y tecnologías similares que utilizan nuestro sitio web y nuestras apps, haz clic aquí. Si lo deseas, también puedes configurar los ajustes de tu navegador o dispositivo móvil para bloquear cookies y mecanismos de almacenamiento local. Sin embargo, ten en cuenta que si lo haces, podrías dejar de tener acceso a las funciones que BledBonds ofrece.</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>La parte legal</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>BledBonds es una red social basada en un sitio web y una aplicación diseñadas como lugar de encuentro para conocer gente nueva, charlar y compartir fotos, noticias e información. Intentamos que sea un lugar divertido y es importante para nosotros (y para ti) que se mantenga un ambiente agradable y seguro. A fin de preservarlo, aceptas que solo de acuerdo con su finalidad y de conformidad con los presentes términos y condiciones, así como las Normas de la comunidad y Consejos de seguridad (en adelante “Condiciones”). Cuando mencionamos BledBonds, nos referimos a www.BledBonds.es, junto con aplicaciones y sitios web asociados.</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>Las Condiciones constituyen un acuerdo legal vinculante entre tú como usuario (en adelante “tú”) y BledBonds Group (en adelante “nosotros” o “nos”). BledBonds Group incluye, entre otros, BledBonds Trading Limited (una empresa inglesa con domicilio en 1 Blossom Yard, Fourth Floor, E1 6RS, Londres), Social Online Payments Limited (registrada en Irlanda con número 496494) y Social Online Payments, Inc. (registrada en Delaware con número 5214252).</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>Las Condiciones serán de aplicación cada vez que visites BledBonds con independencia de que hayas optado por registrarse o no, así que por favor léelas con atención. Cuando accedes a BledBonds, lo utilizas, te registras o recibes servicios a través del mismo, aceptas quedar vinculado por las Condiciones y te comprometes a cumplirlas.</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>SI NO ACEPTAS O NO ESTÁS DE ACUERDO CON ESTAS CONDICIONES, NO ACCEDAS O UTILICES EL SITIO WEB NI LA APLICACIÓN.</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>1. Uso del sitio web y de la app y normas relacionadas con el contenido</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Quién puede utilizar BledBonds?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>BledBonds es un lugar de encuentro para adultos. Solo puedes registrarte en BledBonds o utilizarlo, incluido el uso de cualquiera de sus servicios y funcionalidades, si eres mayor de 18 años (o cualquier otra edad considerada como mayoría de edad en tu país de residencia siempre y cuando esta sea mayor a 18).</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>A este respecto, afirmas reunir los derechos, facultades y capacidades para aceptar las Condiciones y garantizas que al usar BledBonds no estarás contraviniendo ninguna ley o normativa vigente en tu país de residencia. Como usuario, eres el único responsable de cumplir las leyes y normativas locales.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Asimismo, garantizas que nunca has sido declarado culpable de ni estás siendo procesado por ningún delito de agresión, violencia, mala conducta sexual o acoso.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 20 }}>¿Qué tipo de contenido puedo publicar en o subir a BledBonds?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Puedes subir y publicar todo tipo de contenido en BledBonds, incluidas fotografías, mensajes y otros (en adelante “Contenido”).</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>A pesar de esto, hay una serie de normas que regulan el contenido que aceptamos en BledBonds, por lo que si usas nuestra página no subas, publiques ni envíes contenido que:</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}> 1.- sea ilegal o fomente, promueva o incite a cualquier actividad ilegal;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>2.- sea perjudicial para los menores;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>3.- sea difamatorio o calumnioso;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>4.- cuya publicación infrinja los derechos de terceros (incluidos, entre otros, los derechos de propiedad intelectual y los derechos de privacidad);</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>5.- muestre a otra persona y haya sido creado o distribuido sin su consentimiento;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>6.- incluya lenguaje o imágenes que puedan considerarse ofensivas o susceptibles de acosar, molestar, avergonzar, alarmar o irritar a cualquier otra persona;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>7.- sea obsceno, pornográfico, violento o pueda ofender de cualquier otro modo la dignidad humana;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>8.- sea abusivo, insultante o amenazador, discriminatorio o que promueva, refleje o fomente el racismo, el sexismo, el odio o la intolerancia;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>9.- se refiera a actividades comerciales (incluyendo, sin limitación, ventas, concursos y publicidad, enlaces a otros sitios web o números de teléfono de líneas prémium);</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>10.- conlleve la difusión de correo basura o spam;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>11.- suplante o intente engañar o manipular a una persona (incluyendo, sin limitación, estafas y comportamientos no auténticos);</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>12.- contenga spyware, adware, virus, archivos corruptos, programas de gusanos u otros códigos maliciosos diseñados para interrumpir, dañar o limitar la funcionalidad o perturbar cualquier software, hardware, telecomunicaciones, redes, servidores u otros equipos, troyanos o cualquier otro material diseñado para dañar, interferir, interceptar erróneamente o expropiar cualquier dato o información personal, ya sea de BledBonds o de otro modo;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>13.- viole de cualquier otro modo estas normas.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Por favor, usa el sentido común cuando selecciones el Contenido que quieres subir, publicar o enviar en BledBonds dado que eres el único responsable de dicho Contenido.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Usamos una combinación de sistemas automatizados, informes de usuario y un equipo de moderadores para monitorear y revisar cuentas en busca de contenido que indique infracciones de estas normas. Si infringes nuestras normas de forma continuada, nos reservamos el derecho tanto a bloquear como a deshabilitar tu cuenta o tu acceso a BledBonds. Asimismo, nos reservamos el derecho a eliminar cualquier Contenido que subas a BledBonds si consideramos que vulnera las Condiciones o si así lo exige la ley vigente.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>En el caso de los usuarios residentes en la Unión Europea (UE), te notificaremos cuando tomemos medidas en tu cuenta o en tus contenidos, a menos que no sea apropiado que lo hagamos (por ejemplo, que no nos lo permitan los organismos responsables de la aplicación de la ley). Si consideras que hemos cometido un error al tomar dicha medida, puedes recurrir utilizando los procesos expuestos en BledBonds o poniéndote en contacto con nosotros a través del enlace de ayuda de nuestras Normas de la comunidad, disponible aquí. Para el resto de usuarios, nos reservamos el derecho a, sin obligación o previo aviso, eliminar o editar, limitar o bloquear el acceso a cualquier Contenido que subas o publiques en BledBonds, sin que esto tenga consecuencias para ti. BledBonds no tiene la obligación de publicar el Contenido que quieres subir a la página; de verificar la exactitud o veracidad de cualquier Contenido que se añade a BledBonds; o de controlar cómo tú u otros usuarios hacéis uso de BledBonds.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Los usuarios residentes en la UE tienen derechos adicionales en virtud de la Ley de Servicios Digitales (DSA) para: (i) acceder a procesos de resolución extrajudicial de litigios de terceros; (ii) recurrir a los tribunales del Estado miembro de la UE en el que resida; y (iii) presentar una reclamación ante la autoridad reguladora local de la UE. En el caso de los usuarios residentes en el Reino Unido, tienen derecho, en virtud de la legislación local, a interponer una demanda por incumplimiento de contrato si consideran que hemos incumplido las Condiciones al eliminar, restringir o limitar el acceso o la distribución de su Contenido, o al suspender o cancelar su cuenta.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Hay alguna norma relacionada con la información de carácter personal como la dirección de correo electrónico?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>No debes publicar ningún dato de contacto o bancario en tu página de perfil (en adelante, “Perfil”) ya sean los tuyos o los de otra persona (como por ejemplo nombres, direcciones o códigos postales, números de teléfono, direcciones de correo electrónico, URLs, datos de tarjetas de crédito/débito o bancarios, o datos sobre lugares de trabajo). Si decides revelar cualquier tipo de información personal a otros usuarios, ya sea por correo electrónico o similar, es bajo tu propia responsabilidad. Te aconsejamos que tomes las mismas precauciones al proporcionar datos personales a terceros como lo harías en otras circunstancias. Por favor, sigue las Normas de la comunidad y Consejos de seguridad en todo momento.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Puedo usar la información personal de otras personas?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Solamente debes utilizar la información personal de otros usuarios si tu fin coincide con el de BledBonds: permitir que diferentes personas se conozcan. Debes tener en cuenta que no puedes utilizar la información de otros usuarios con fines comerciales, para enviar ‘spam’ o correo no deseado, acosar o hacer amenazas ilegales. BledBonds se reserva el derecho a prohibir el acceso a sus servicios y a eliminar las cuentas de aquellos usuarios que utilicen la información de otros miembros de manera inapropiada.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Quién puede ver el Contenido que publico en BledBonds?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>El público en general puede acceder al Contenido que publiques en BledBonds. Si no quieres que otras personas tengan acceso a ese Contenido, tienes la opción de crear álbumes privados y otorgar el acceso solo a las personas que consideres oportunas. Si, a pesar de esto, no quieres que nadie pueda ver tu Contenido, te recomendamos que no lo subas a BledBonds.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Qué más he de tener en cuenta?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Al utilizar BledBonds y adherirte a las Condiciones, te concedemos una licencia limitada, personal, no exclusiva y no transferible para usar y subir Contenido y para disfrutar de BledBonds para tu uso exclusivo. Aparte de esta licencia, no cuentas con ningún otro derecho respecto del uso del sitio web o las aplicaciones y su Contenido y servicios, y por tanto no podrás modificar, editar, copiar, alterar, mejorar, producir obras derivadas, reproducir mediante ingeniería inversa, o explotar el sitio web, las aplicaciones ni el Contenido de ninguna otra manera. En caso de infringir las presentes Condiciones, dicha licencia será anulada y deberás destruir de forma inmediata todo Contenido que hubieres descargado o imprimido.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Hemos desarrollado algoritmos de emparejamiento para predecir tu compatibilidad con otras personas usuarias y así poder mostrarte gente que consideramos un buen match para ti. Para más información sobre el uso que hacemos de los sistemas de recomendación y los principales parámetros que utilizamos, consulta nuestra Política de privacidad(se abre en otra ventana).</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>2. Propiedad del contenido</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Soy el dueño del Contenido que publico en BledBonds?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Sí (siempre que seas el dueño legítimo de ese Contenido. Lee nuestras normas relacionadas con la publicación de Contenido que no te pertenece).</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Ten en cuenta que al utilizar, subir o publicar el Contenido en BledBonds garantizas que:</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>1.- eres propietario y dueño de dicho Contenido y estás de acuerdo en renunciar a cualquier y a todos los derechos morales relacionados con ese Contenido (incluido, sin limitación, el derecho a identificarte como su autor);</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>2.- tienes licencia para utilizar, subir o publicar el Contenido; o</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>3.- cuentas con el consentimiento y autorización para utilizar, subir o publicar el Contenido.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Ten en cuenta que al utilizar, subir o publicar el Contenido en BledBonds nos garantizas que tienes el permiso para hacerlo y, automáticamente, nos concedes una licencia no exclusiva, sin derechos de autor, perpetua y universal para utilizar dicho Contenido de cualquier manera (incluyendo, sin limitación, la edición, copia, modificación, adaptación, traducción, cambio de formato, creación de proyectos derivados, incorporación a otros proyectos, publicidad, distribución o a poner a disposición del público en general dicho Contenido, ya sea en su totalidad o parcial y en cualquier formato disponible actualmente o en el futuro).</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>BledBonds puede ceder y/o traspasar la licencia arriba mencionada a nuestros afiliados y sucesores sin que sea necesario tu consentimiento.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>BledBonds se reserva el derecho a revelar tu identidad a terceros que afirmen que el Contenido publicado en nuestra página o app viola sus derechos de propiedad intelectual, privacidad u otros.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿A quién pertenece el resto de Contenido en BledBonds?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>¡A nosotros! BledBonds es propietario de los textos, gráficos, interfaces de usuario, marcas, logotipos, sonidos e ilustraciones que puedes ver en nuestra página, además de encargarse de su control y autorización. Todos ellos están protegidos por marcas registradas, derechos de autor y otros derechos de propiedad intelectual.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Puedo utilizar Contenido que no me pertenece?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Excluyendo el Contenido publicado por el propio usuario, los miembros no tienen el permiso para utilizar el Contenido de BledBonds y aseguran no usar ningún tipo de Contenido que pueda violar nuestros derechos o los derechos de terceros. Esto significa que los usuarios aceptan no copiar, modificar, adaptar, distribuir, publicar o vender parte o la totalidad de la página de BledBonds o del Contenido publicado en esta (aparte del Contenido publicado por los usuarios) a cualquier persona.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>3. Servicios de pago</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Qué puedo comprar en BledBonds?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>BledBonds te ofrece la posibilidad de pagar por ciertos servicios disponibles en la página. Los servicios premium de BledBonds te permiten encontrar y conocer a más gente, personalizar tu perfil e incrementar tu popularidad para que más gente encuentre tu perfil. BledBonds también dispone de diversos juegos en la página. Puedes adquirir estos servicios premium después de registrarte en BledBonds y es posible contratarlos por diferentes periodos de tiempo.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Si adquieres servicios premium, tienes el derecho a cancelar y obtener un reembolso por todos los pagos efectuados durante un periodo de 14 días. Si deseas cancelarlos, ponte en contacto con nosotros a través de nuestra página de contacto. Ten en cuenta que si decides descargar cualquier Contenido que forma parte de un servicio de pago dentro del periodo de 14 días, puede que pierdas este derecho. Asimismo, una vez transcurrido dicho periodo, los servicios que hayas adquirido pasarán a ser no reembolsables.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Tienes la opción de cambiar la recarga automática en cualquier momento desde la sección de configuración de pagos que encontrarás en tu perfil. El coste de estos servicios puede variar a razón de distintos factores, tales como y no limitados a ofertas promocionales, bonuses de fidelidad y cualesquiera otros descuentos.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Los servicios de pago no están disponibles en países sancionados.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Cómo renuevo los servicios premium de BledBonds?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Una vez que adquieras un servicio premium, autorizas a BledBonds a que efectúe el cobro a través del método de pago que hayas elegido. Si quieres cancelar o cambiar el método de pago, puedes hacerlo desde el menú ‘configuración de pagos’ que encontrarás en tu perfil o contactando con tu proveedor de servicios móviles. Si tu método de pago es a través del teléfono móvil, consulta las condiciones de pago con tu proveedor, ya que estas determinan cómo se efectúan los pagos a BledBonds y cómo se pueden cambiar o cancelar estos pagos. La suscripción a los servicios premium de BledBonds se renovará automáticamente hasta que decidas cancelarla. Si has activado la opción de recarga automática, tus créditos se recargarán automáticamente hasta que decidas dar de baja esta opción.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Puedo transferir mis servicios de pago a otra cuenta de BledBonds?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Si decides utilizar nuestros juegos, servicios premium u otros servicios destinados a mejorar tu experiencia como usuario de BledBonds, te comprometes a hacerlo para tu uso personal y a no transferirlos (de forma gratuita o lucrativa), comprarlos o venderlos a otros usuarios de BledBonds. BledBonds se reserva el derecho a no ofrecerte algún servicio de pago si has intentado utilizar estos servicios para otros usos o se los has intentado comprar a otro usuario. BledBonds solo ofrecerá un servicio de pago a un usuario cuando sea este quien lo haya solicitado.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Mis créditos duran para siempre?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>No. Nos reservamos el derecho a caducar los créditos no utilizados pasados 6 meses (excepto aquellos adquiridos a través de iTunes). Si eliminas tu cuenta o BledBonds lo hace por haber incumplido estas Condiciones, perderás los créditos que disponías. Los créditos gratuitos o promocionales pueden caducar en cualquier momento. Asimismo, si recibes créditos adicionales como parte de una función de pago, podemos cambiar el número de créditos adicionales para esa función y/o caducarlos en cualquier momento. Los créditos no se pueden canjear por ninguna cantidad de dinero a no ser que BledBonds exprese lo contrario por escrito.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Por favor, consulta las Condiciones del Servicio en la página de recarga para obtener más información sobre pagos.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>4. Acceso a la página y a la aplicación</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Está garantizado que BledBonds funcionará en todo momento?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Desafortunadamente, no lo podemos garantizar dado que en algunas ocasiones llevamos a cabo tareas de mantenimiento de la aplicación y del sitio web o puede que estos se vean afectados por incidencias o circunstancias fuera de nuestro control, por lo que BledBonds se ofrece en todo momento en el estado en el que se encuentra y según disponibilidad. No podemos garantizar la calidad, precisión, funcionalidad, disponibilidad o rendimiento de BledBonds y nos reservamos el derecho a suspender, retirar, corregir, modificar o variar la prestación de los servicios de BledBonds sin previo aviso y sin responsabilidad para el usuario.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Y respecto al acceso a través del móvil?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>El usuario es el único responsable de asegurarse de disponer de todo lo necesario para acceder a BledBonds (incluyendo tarifas del proveedor de internet y del proveedor de internet móvil y todo lo relacionado con el acceso). BledBonds no asumirá ninguna responsabilidad si la página o sus servicios no funcionan como deberían a través de servicios móviles o servicios similares disponibles actualmente o en un futuro.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Cuando accedes a BledBonds o cuando permites recibir nuestros mensajes o notificaciones a través de tu teléfono y/u otro dispositivo móvil, aceptas que tu proveedor de internet o de servicios móviles puede cobrarte por ello. Bajo ninguna circunstancia BledBonds se hará responsable de esos cargos.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>No estoy registrado y no puedo acceder a cierto Contenido o servicios del sitio web o de la app. ¿A qué se debe?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Los usuarios que no están registrados solo podrán acceder al Contenido de BledBonds que está disponible para el público en general. Tampoco dispondrán de un perfil y puede que su opción de publicar Contenido esté limitada. El grado de acceso a cierto Contenido en BledBonds por parte de los usuarios registrados dependerá de una serie de requisitos que deben cumplir sus perfiles. Puede que cambiemos o actualicemos estos requisitos de vez en cuando sin previo aviso y bajo nuestro criterio.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>5. Terminación del servicio por tu parte</StyledText>
              <StyledText litle justify style={{ marginTop: 12 }}>¿Qué tengo que hacer si me quiero “dar de baja” de BledBonds?</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>Si estás registrado en BledBonds, te puedes dar de baja en cualquier momento accediendo al apartado ‘Eliminar cuenta’ dentro del menú ‘Configuración’. Guardaremos tus datos en caso de que decidas recuperar tu cuenta con posterioridad. Muchos usuarios deciden desactivar sus cuentas por razones de carácter temporal y, por ello, agradecen que sus datos sigan estando disponibles cuando regresan. Por este motivo, es posible restaurar una cuenta y perfil en su totalidad durante un plazo de 28 días desde su desactivación. Si decides dar de baja tu cuenta, nos reservamos el derecho a eliminar cualquier Contenido que hayas añadido o publicado en BledBonds. Para más información, consulta nuestra Política de privacidad(se abre en otra ventana).</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>El contenido que hayas añadido a BledBonds, exceptuando aquel en tu Perfil (como comentarios o mensajes de emails), puede seguir apareciendo en BledBonds tras haberte dado de baja.</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>6. Abusos/Quejas</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Cómo puedo denunciar a alguien que no respeta las Condiciones?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Puedes denunciar un abuso o realizar una queja sobre algún Contenido en BledBonds a través del formulario que encontrarás en la siguiente página: Página de contacto. También puedes denunciar a un usuario directamente desde su perfil, haciendo clic en el enlace ‘Bloquear o denunciar’, eligiendo el asunto de la queja y añadiendo un comentario de lo sucedido y de lo que creas conveniente.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Siempre haremos todo lo posible para resolver cualquier problema que puedas tener con nuestro servicio. Sin embargo, si tu queja no se resuelve, puede que tengas la posibilidad de usar la plataforma de resolución de litigios en línea de la Comisión Europea(se abre en otra ventana).</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Se ha investigado a otros usuarios?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>NO. SE ENTIENDE QUE EN EL DESARROLLO ORDINARIO DE LAS OPERACIONES DE BledBonds, EL GRUPO BledBonds NO REALIZA COMPROBACIONES DE LOS ANTECEDENTES PENALES DE SUS USUARIOS NI INVESTIGA REGULARMENTE LOS ANTECEDENTES DE SUS USUARIOS NI INTENTA VERIFICAR LAS DECLARACIONES DE SUS USUARIOS. EL GRUPO BledBonds NO SE PRONUNCIA NI GARANTIZA LA CONDUCTA DE LOS USUARIOS NI SU COMPATIBILIDAD CON LOS USUARIOS ACTUALES O FUTUROS. BledBonds GROUP SE RESERVA EL DERECHO A REALIZAR CUALQUIER COMPROBACIÓN DE ANTECEDENTES PENALES U OTRAS INVESTIGACIONES (COMO BÚSQUEDAS EN EL REGISTRO DE DELINCUENTES SEXUALES) EN CUALQUIER MOMENTO Y A UTILIZAR LOS REGISTROS PÚBLICOS DISPONIBLES PARA CUALQUIER FIN.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>No controlamos nada de lo que nuestros usuarios dicen o hacen. Aunque establecemos y hacemos cumplir nuestras Condiciones de uso y tomamos medidas para tratar de evitar comportamientos inadecuados en la comunidad de BledBonds, no tenemos la obligación de protegerte ante ningún tipo de daño causado por otros usuarios. Eres la única persona responsable de tus interacciones con otros usuarios de BledBonds.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Por la presente aceptas, en la medida máxima permitida por la legislación aplicable, eximir al Grupo BledBonds y a sus filiales, así como a sus respectivos funcionarios, directores, empleados, agentes, representantes y sucesores, de cualquier reclamación, demanda, pérdida, daño, derecho y acción de cualquier tipo, incluidos los daños personales, la muerte y los daños a la propiedad que surjan directa o indirectamente de tus interacciones con otros usuarios de BledBonds o de la conducta de estos.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>7. Política de privacidad</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Tenéis unas pautas sobre lo que podéis hacer con mi información personal?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Toda la información se procesa conforme a nuestra Política de privacidad(se abre en otra ventana), incluida en estas Condiciones. Te recomendamos que leas los términos de nuestra Política de privacidad(se abre en otra ventana) antes de usar BledBonds.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>8. Enlaces</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Tienen algo que ver con BledBonds los enlaces que hay en la página o en la app?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>BledBonds puede contener enlaces a otros sitios web, recursos u ofertas comerciales prestados por terceros. BledBonds proporciona estos enlaces para un fin exclusivamente informativo. Si haces clic en estos enlaces serás redireccionado a páginas web de terceros, que pueden tener sus propias condiciones de uso y políticas de privacidad, pudiendo ser diferentes a estas Condiciones. Los enlaces o cualquier otro contenido en páginas web o sitios de terceros no están avalados por BledBonds.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Ten en cuenta que no tenemos ningún tipo de control sobre el contenido de los sitios web o páginas de terceros, por lo tanto no nos hacemos responsables de los mismos, incluyendo (pero no limitado a) el cumplimiento de las leyes y normas que regulan las páginas web de terceros.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>9. Exclusión de garantías y exclusión de responsabilidad</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>Me he olvidado de las normas de BledBonds y alguien me ha amenazado con demandarme. ¿Me podrán ayudar vuestros abogados?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>No. Si te comportas de una manera que resulta ofensiva a otros usuarios, serás el único responsable de las consecuencias. Renunciamos de manera rotunda a cualquier responsabilidad, parcial o total, relacionada con tu conducta o la conducta de otro usuario de BledBonds, así como con el contenido publicado en nuestra página por ti o por cualquier otro miembro.</StyledText>
              </View>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>Tengo un conocido que es abogado y dice que BledBonds no puede excluir su responsabilidad por todo…</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Nada en estas Condiciones limita o excluye nuestra responsabilidad por:</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>1.- muerte o daños personales causados por nuestra negligencia demostrada;</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>2.- fraude o tergiversación fraudulenta; o</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>3.- cualquier responsabilidad que no pueda ser limitada o excluida por la ley.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>En la máxima medida permitida por la ley, BledBonds excluye expresamente:</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>1.- todas las condiciones, representaciones, garantías y otros términos que de otro modo podrían estar implícitos en el estatuto, el derecho consuetudinario o la ley de equidad; y</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>2.- cualquier responsabilidad en la que incurra derivada del uso de BledBonds, sus servicios o estos Términos, incluidos, entre otros, los reclamos, cargos, demandas, daños, responsabilidades, pérdidas o gastos de cualquier naturaleza y de cualquier manera directa, daños indirectos, incidentales, especiales, ejemplares, punitivos o consecuentes (sin embargo, que surjan, incluida la negligencia), pérdida de uso, pérdida de datos, pérdida causada por un virus informático o electrónico, pérdida de ingresos o ganancias, pérdida o daño a la propiedad, desperdicio tiempo de gestión o de oficina, incumplimiento de contrato o reclamaciones de terceros u otras pérdidas de cualquier tipo o carácter, incluso si BledBonds ha sido advertido de la posibilidad de tales daños o pérdidas, derivados o relacionados con el uso de BledBonds. Esta limitación de responsabilidad se aplica, pero no está limitada, a la transmisión de cualquier dispositivo deshabilitador o virus que pueda infectar tu equipo, fallos, equipos o líneas de comunicación mecánicos o eléctricos o cualquier otro problema interrelacionado (como por ejemplo, si no tienes acceso a tu proveedor de servicios de internet), acceso no autorizado, robo, lesiones corporales (a excepción de las causadas por negligencia demostrada por nuestra parte), daños materiales, errores del operador, huelgas o cualquier otro tipo de problemas laborales o circunstancias de fuerza mayor que estén relacionados con BledBonds, incluyendo, sin limitación, cualquier responsabilidad por pérdida de ingresos, pérdida de beneficios, pérdida de contratos o negocios, pérdida de ahorros previstos, pérdida de fondos de comercio, pérdida de información, mal uso de la gestión u horario laboral y cualquier otras pérdidas o daños de cualquier naturaleza que pudieran surgir y estar causados por agravios (incluyendo, pero no limitado, negligencias), incumplimientos de contrato o similares, incluso si son previsibles de manera directa o incumplimiento de contrato o de otro tipo, incluso si es previsible, ya sea que surja directa o indirectamente.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>responsabilidad total de BledBonds para con los usuarios en relación con cualesquiera pérdidas surgidas de o relacionadas con las presentes Condiciones tanto contractual como extracontractual (incluida negligencia e incumplimiento de obligación reglamentaria) o de cualquier otra naturaleza no excederá en ningún caso el valor correspondiente a 20 libras esterlinas.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>¿Qué pasa con la fiabilidad de BledBonds y la información que contiene?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>BledBonds ha tomado las medidas necesarias para asegurarse de la difusión, disponibilidad y exactitud de la información que contiene la página web y proporciona esa información “tal cual”, sujeta a la disponibilidad del servicio. BledBonds no da ni ofrece ninguna garantía sobre ningún tipo de información de la página web, ya sea de manera explícita o implícita. El uso que hagas de BledBonds y de sus contenidos depende solamente de ti. BledBonds no se hace responsable de ninguna pérdida de información a raíz de la transmisión, uso de datos o Contenido erróneo publicado por los usuarios. Eres responsable de tomar las precauciones necesarias para asegurarte de que el material que obtengas de BledBonds está libre de virus u otros componentes perjudiciales. Aceptas el hecho de que el servicio de BledBonds pueda ser interrumpido o contener errores, que los defectos pueden no ser corregidos o que BledBonds, o su servidor, no esté libres de virus, errores, programas espía (spyware), Troyanos o similar software malintencionado. BledBonds no se hace responsable de cualquier daño al hardware o software de tu ordenador/computador u otro tipo de tecnología, incluyendo, sin limitación, daños causados por fallos de seguridad o virus, errores, falsificaciones, fraude, omisión, interrupción, defecto, retraso en la transmisión u operación, fallo en la línea, red o cualquier otro fallo técnico. En el caso improbable de que se halle un error en BledBonds, BledBonds hará todo lo posible para reparar o solucionar dicho error sin costes y sin ocasionar molestias a los usuarios tan pronto como sea posible.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>10. Indemnización</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>Me he olvidado del código de conducta de la comunidad y alguien amenaza con demandar a BledBonds. ¿Qué puede ocurrir?</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Si alguien nos demanda debido a tu actividad en BledBonds, tenemos el derecho a sostener o resolver la demanda, tal y como lo creamos conveniente. Si te lo pedimos, colaborarás plenamente con nosotros para ayudarnos a defender la demanda pertinente.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Aceptas no eximirte de responsabilidad e indemnizar a nuestros funcionarios, directores, empleados, agentes, representantes y licenciadores de y contra cualquier demanda de terceros, daños (presentes y futuros), acciones, juicios, demandas, pérdidas, responsabilidades, costes y gastos (incluyendo costes legales) surgidos como consecuencia o en relación con tu uso y actividad en BledBonds, la publicación de Contenido que hayas subido a BledBonds o tu conducta, si no se ajustan a las Condiciones u otras leyes y normas (“Demanda”). BledBonds se reserva el derecho a resolver, llegar a un acuerdo o pagar cualquier o todas las Demandas o acciones interpuestas contra nosotros sin necesidad de obtener tu consentimiento previo.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>11. Varios</StyledText>
              <View>
                <StyledText litle justify style={{ marginTop: 12 }}>¿Qué pasa con las cláusulas estándar que aparecen al final de la mayoría de los contratos? ¡Son lo mejor de todo!</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Ya que nos lo pides así…</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Estas Condiciones y cualquier disputa o reclamación surgidas de las mismas o en relación con ellas (incluido litigios o reclamaciones no contractuales) serán interpretados y regulados bajo la Ley de Inglaterra. En caso de conflicto entre esta versión de las Condiciones de Uso de BledBonds y su original en inglés, prevalecerá esta última.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Nos reservamos el derecho a modificar, corregir o cambiar estas Condiciones en cualquier momento (un “Cambio”). Cuando esto ocurra, publicaremos los Cambios en esta página así como la fecha en la que entrarían en vigor en la parte final de las Condiciones. En algunas circunstancias, puede que te enviemos un email para notificarte de los Cambios. Te recomendamos que visites esta página con regularidad para estar al día sobre cualquier Cambio que se pueda producir.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Si no aceptas los Cambios de las Condiciones, deberías dejar de utilizar BledBonds de inmediato. Si lo usas después de que se hayan introducido Cambios, daremos por hecho que los aceptas y los respetas.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Si, por cualquier razón, alguna de estas Condiciones fuera declarada ilegal, inválida o inaplicable por un tribunal jurisdiccional competente, debido a que algún término fuera ilegal, inválido o inaplicable, será borrada y eliminada de estas Condiciones, aunque el resto permanecerá en vigor y seguirá siendo vinculante y ejecutable.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Las Condiciones establecen el acuerdo entre BledBonds y tú en relación con tu uso de la página web y reemplazan todos los acuerdos anteriores que se hayan establecido entre nosotros (ya sea de manera escrita u oral). Nada en esta cláusula podrá limitar o excluir cualquier responsabilidad por tergiversación o falsedad.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Ningún fallo o retraso por nuestra parte en el ejercicio de cualquier derecho, facultad o privilegio incluido en estas Condiciones debe entenderse como una renuncia a dicho derecho o a la aceptación de cualquier cambio de las Condiciones, ni tampoco el ejercicio individual o parcial de cualquier derecho, facultad o privilegio por cualquiera de las partes como exclusión de cualquier uso futuro de dicho derecho, facultad o privilegio.</StyledText>
                <StyledText xsmall justify style={{ marginTop: 12 }}>Nada en las Condiciones otorga o pretende otorgar a terceros cualquier beneficio o derecho de hacer cumplir cualquiera de las Condiciones y la Ley de Contratos (Derechos de Terceros) de 1999 no será aplicable a las Condiciones.</StyledText>
              </View>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>Sobre nosotros</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>www.BledBonds.es es una app y sitio web que pertenece a y opera a través de BledBonds Trading Limited.</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>Se trata de una empresa registrada en Inglaterra con número 07540255.</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>Nuestro domicilio se encuentra en 1 Blossom Yard, Fourth Floor, E1 6RS, Londres.</StyledText>
            </View>
            <View>
              <StyledText subtitle bold mayus justify style={{ marginTop: 20 }}>Fecha efectiva</StyledText>
              <StyledText xsmall justify style={{ marginTop: 12 }}>Estas Condiciones fueron actualizadas por última vez el día 8 de agosto de 2024.</StyledText>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  formGroup: {
    marginTop: 10,
  },
  linkStyle: {
    textDecorationLine: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  box: {
    flex: 1,
  },
  box2: {
    flex: 10,
    height: '100%',
  },
});
