import type { SolutionEsOverride } from "@/types/content";

export const solutionsEs: Record<string, SolutionEsOverride> = {
  "restaurants": {
    "name": "Restaurantes",
    "headline": "Procesamiento de pagos hecho para restaurantes",
    "description": "Ya sea que tenga un lugar de comida rápida en H Street o un restaurante fino en Georgetown, PAYHERO le ofrece precios transparentes, depósitos rápidos y el soporte local que necesita en los momentos más ocupados.",
    "features": [
      "Todas las tarjetas + Apple Pay, Google Pay",
      "Ajuste de propinas y pagos divididos",
      "Depósitos al día siguiente",
      "Funciona con cualquier sistema POS",
      "Sin contratos ni penalizaciones por cancelación",
      "Soporte local 24/7"
    ],
    "painPoints": [
      "Alto volumen de transacciones con márgenes ajustados",
      "Complejidad de ajuste de propinas",
      "Atados a paquetes POS costosos (Toast, Clover)",
      "Comisiones ocultas en precios escalonados"
    ]
  },
  "liquor-stores": {
    "name": "Licorerías",
    "headline": "Tarifas más bajas para retail de licor de alto volumen",
    "description": "Las licorerías en el DMV procesan altos volúmenes con márgenes ajustados. PAYHERO pasa el costo real de interchange — sin juegos de precios escalonados ni sobrecargos ocultos.",
    "features": [
      "Bajas tarifas de interchange pass-through",
      "Sin tarifas mensuales ni PCI",
      "Procesamiento de alto volumen",
      "Soporte de terminal y contactless",
      "Compatible con verificación de edad",
      "Optimización de procesamiento por lote"
    ],
    "painPoints": [
      "Márgenes ajustados requieren las tarifas más bajas",
      "Alto volumen significa que diferencias pequeñas se acumulan rápido",
      "Procesadores legacy con precios escalonados que ocultan costos",
      "Rentas de equipo que cuestan más que comprarlo"
    ]
  },
  "retail": {
    "name": "Retail",
    "headline": "Procesamiento transparente para negocios de retail",
    "description": "Desde boutiques hasta ferreterías, los negocios de retail del DMV merecen precios transparentes. PAYHERO lo hace simple — usted ve cada centavo de sus costos de procesamiento.",
    "features": [
      "Acepte todas las tarjetas principales y wallets digitales",
      "Compatible con sistemas de inventario",
      "Bajas tarifas por transacción",
      "Soporte de contactless y chip",
      "Integración de e-commerce disponible",
      "Reportes de transacciones en tiempo real"
    ],
    "painPoints": [
      "Pagando de más en procesadores de tarifa plana como Square",
      "Precios escalonados complejos que ocultan el costo real",
      "Necesita pagos en tienda y en línea",
      "Rentas de equipo costosas"
    ]
  },
  "auto-shops": {
    "name": "Talleres mecánicos y de llantas",
    "headline": "Hecho para negocios de servicio con tickets altos",
    "description": "Los talleres mecánicos y de llantas procesan transacciones más grandes donde cada punto base importa. Los precios transparentes de PAYHERO significan que usted conserva más en cada reparación y servicio.",
    "features": [
      "Bajo costo por transacción en tickets altos",
      "Soporte tecleado y card-present",
      "Pagos por factura y recurrentes",
      "Sin contratos ni penalizaciones",
      "Aceptación de tarjetas de flota",
      "Configuración rápida — cambie en 48 horas"
    ],
    "painPoints": [
      "Tickets promedio altos ($200-$800) amplifican diferencias de tarifa",
      "Transacciones tecleadas cobradas a tarifas más altas",
      "Necesita aceptar tarjetas corporativas y de flota",
      "Contratos a largo plazo con penalizaciones por terminación"
    ]
  },
  "medical-services": {
    "name": "Servicios médicos",
    "headline": "Procesamiento de pagos seguro para salud",
    "description": "Oficinas médicas, prácticas dentales y proveedores de salud necesitan procesamiento confiable y seguro. PAYHERO ofrece flujos de pago compatibles con HIPAA y precios transparentes.",
    "features": [
      "Flujos de pago compatibles con HIPAA",
      "Pagos recurrentes y planes de pago",
      "Integración de estados de pacientes",
      "Almacenamiento seguro de tarjeta en archivo",
      "Cobro de copagos y deducibles",
      "Reportes compatibles con EOB"
    ],
    "painPoints": [
      "Necesita procesamiento seguro y conforme",
      "Planes de pago de pacientes requieren facturación recurrente",
      "Retrasos en reembolsos de seguros requieren depósitos rápidos",
      "Flujos de facturación complejos"
    ]
  },
  "grocery-stores": {
    "name": "Supermercados",
    "headline": "Procesamiento hecho para los márgenes ajustados de supermercados",
    "description": "Los supermercados tienen los márgenes más ajustados y las tarifas de interchange más bajas. PAYHERO pasa esos ahorros a usted — sin juegos de margen que borren su ventaja de interchange.",
    "features": [
      "Tarifas más bajas de interchange pass-through",
      "Aceptación de EBT y SNAP",
      "Procesamiento veloz para cajas",
      "Optimización de PIN debit",
      "Integración con balanzas y escáneres",
      "Sin tarifas mensuales ni PCI"
    ],
    "painPoints": [
      "Márgenes muy ajustados exigen las tarifas más bajas posibles",
      "Necesita EBT/SNAP además de crédito y débito",
      "La velocidad de la caja es crítica",
      "Precios escalonados anulan la ventaja de bajo interchange"
    ]
  },
  "convenience-stores": {
    "name": "Tiendas de conveniencia",
    "headline": "Procesamiento rápido y asequible para tiendas de conveniencia",
    "description": "Las tiendas de conveniencia necesitan procesamiento rápido, bajas tarifas en tickets pequeños y uptime confiable. PAYHERO lo mantiene simple — precios transparentes sin sorpresas.",
    "features": [
      "Optimizado para transacciones de ticket pequeño",
      "Pagos contactless tap-and-go rápidos",
      "Compatible con lotería y tabaco",
      "Ruteo de PIN debit para menor costo",
      "Soporte de terminal 24/7",
      "Sin requisitos mínimos de procesamiento"
    ],
    "painPoints": [
      "Tickets pequeños hacen que las tarifas por transacción importen más",
      "Necesita procesamiento rápido por alto volumen de clientes",
      "A menudo atados a rentas de terminal costosas",
      "Tarifas mensuales ocultas erosionan márgenes ajustados"
    ]
  },
  "nonprofits": {
    "name": "Organizaciones sin fines de lucro",
    "headline": "Procesamiento de pagos para organizaciones con misión",
    "description": "Cada dólar importa cuando se sirve una misión. PAYHERO ayuda a las organizaciones sin fines de lucro del DMV a aceptar donaciones y pagos con las tarifas más bajas posibles — para que más dinero vaya a su causa.",
    "features": [
      "Procesamiento de donaciones de bajo costo",
      "Soporte de donaciones recurrentes",
      "Donaciones en línea y en persona",
      "Generación de recibos para donantes",
      "Pagos para boletos de eventos",
      "Sin tarifas mensuales — solo paga cuando procesa"
    ],
    "painPoints": [
      "Altas tarifas reducen el impacto de las donaciones",
      "Necesita capacidad de donaciones recurrentes",
      "Debe soportar donaciones en línea y en persona",
      "La transparencia es crítica para la confianza del donante"
    ]
  },
  "wholesale": {
    "name": "Mayoristas",
    "headline": "Procesamiento B2B para mayoristas",
    "description": "Los negocios mayoristas procesan grandes transacciones B2B con tarjetas corporativas y necesitan procesamiento de datos Nivel 2/3 para obtener las tarifas más bajas. PAYHERO lo maneja todo.",
    "features": [
      "Procesamiento de datos Nivel 2/3 para tarifas B2B más bajas",
      "Optimización de tarjetas corporativas y de compra",
      "Soporte de transacciones de gran ticket",
      "Integración de pagos por factura",
      "Soporte de términos netos y planes de pago",
      "Reportes detallados de transacciones"
    ],
    "painPoints": [
      "El interchange de tarjetas corporativas es la categoría más alta",
      "Sin datos Nivel 2/3, paga de más en cada transacción B2B",
      "Los tickets grandes amplifican incluso pequeñas diferencias de tarifa",
      "Necesita reportes detallados para conciliación B2B"
    ]
  }
};
