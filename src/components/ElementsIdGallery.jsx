import Chip from "./Chip"; // Make sure the import path is correct
import ExternalLink from "./ExternalLink"; // Import the ExternalLink component

const elementTypeLinks = {
  pixels: [
    {
      title: "Configurar Google Analytics 4",
      url: "https://atendimento.nuvemshop.com.br/pt_BR/google-analytics/como-configurar-e-usar-o-google-analytics?src=nimbus-detector",
    },
    {
      title: "Configurar Google Tag Manager",
      url: "https://atendimento.nuvemshop.com.br/pt_BR/12313-codigos-externos/como-instalar-google-tag-manager-gtm-na-nuvemshop?src=nimbus-detector",
    },
    {
      title: "Configurar Pixel Meta (Facebook)",
      url: "https://atendimento.nuvemshop.com.br/pt_BR/pixel-do-facebook/como-utilizar-o-pixel-do-facebook?src=nimbus-detector",
    },
    {
      title: "Configurar TikTok Ads",
      url: "https://atendimento.nuvemshop.com.br/pt_BR/tiktok/como-conectar-o-tiktok-ads-com-a-sua-nuvemshop?src=nimbus-detector",
    },
    // More pixel-related links...
  ],
  metaTags: [
    {
      title: "Verificação Bing",
      url: "https://atendimento.nuvemshop.com.br/pt_BR/propriedades-google-e-bing/como-vincular-o-bing-webmaster-tools-em-minha-loja?src=nimbus-detector",
    },
    {
      title: "Verificação Google Shopping",
      url: "https://atendimento.nuvemshop.com.br/pt_BR/google-shopping/como-verificar-e-reivindicar-seu-site-nuvemshop-no-google-merchant-center?src=nimbus-detector",
    },
    {
      title: "Verificação Meta (Facebook/Instagram)",
      url: "https://atendimento.nuvemshop.com.br/pt_BR/requisitos-para-integrar-facebook-e-instagram/como-verificar-o-dominio-para-o-instagram-shopping?src=nimbus-detector",
    },
    {
      title: "Verificação Pinterest",
      url: "https://atendimento.nuvemshop.com.br/pt_BR/123412-redes-sociais/como-inserir-o-pinterest-em-minha-loja-nuvemshop?src=nimbus-detector",
    },
  ],
};

function ElementsIdGallery({ elementIDs, elementType }) {
  // Notice the prop change to 'elementIDs' and addition of 'type'
  // Determine the title based on the type prop
  const title =
    elementType === "pixels" ? "IDs dos Pixels" : "ID das Meta Tags";
  const warningMsg =
    elementType === "pixels"
      ? " 🛜 Detecção de IDs ainda em beta!"
      : " 🛜 Meta-tags não detectadas não necessariamente são um problema.";

  const links =
    elementType === "pixels"
      ? elementTypeLinks.pixels
      : elementTypeLinks.metaTags;

  return (
    <div className="flex flex-col bg-fog bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 rounded-md text-xs p-2 my-2 shadow-lg shadow-frost/40">
      <h3 className="w-full text-sm font-light text-ocean mb-2 px-2">
        {title}
      </h3>
      <div className="flex flex-wrap justify-start items-center">
        {Object.entries(elementIDs).flatMap(([key, ids]) =>
          ids.length > 0
            ? ids.map((id, index) => (
                <Chip key={`${key}-${index}`} logoKey={key} value={id} />
              ))
            : null
        )}
      </div>
      <div className="m-2 mx-1 w-max items-center bg-frost/20 rounded-md px-2 py-1 shadow-sm shadow-frost/50 border border-frost/50 text-xs text-ink cursor-default hover:bg-frost/40 transition-all duration-300">
        {warningMsg}
      </div>
      <div className="px-1 my-1 text-ocean font-md">
        <details className="pt-2 pb-1 px-2 cursor-pointer  bg-fog border border-frost/40 shadow-sm shadow-frost/50 rounded-md">
          <summary>🔎 Documentações Relevantes</summary>
          <div className="font-light py-1 mb-1 flex flex-col last:mb-0">
            {links.map((link, index) => (
              <ExternalLink key={index} title={link.title} url={link.url} />
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}

export default ElementsIdGallery;
