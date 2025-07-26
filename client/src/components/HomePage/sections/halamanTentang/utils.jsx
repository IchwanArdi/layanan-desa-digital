// utils.js - File untuk function helper

// Function untuk memformat konten text menjadi berbagai jenis elemen
export const formatContent = (content) => {
  const lines = content.split('\n');
  const formattedContent = [];
  let currentParagraph = [];

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    // Jika baris kosong
    if (trimmedLine === '') {
      if (currentParagraph.length > 0) {
        formattedContent.push({
          type: 'paragraph',
          content: currentParagraph.join(' '),
        });
        currentParagraph = [];
      }
    }
    // Jika semua huruf besar (HEADER)
    else if (trimmedLine.match(/^[A-Z\s]+:?$/)) {
      if (currentParagraph.length > 0) {
        formattedContent.push({
          type: 'paragraph',
          content: currentParagraph.join(' '),
        });
        currentParagraph = [];
      }
      formattedContent.push({
        type: 'header',
        content: trimmedLine,
      });
    }
    // Jika numbered list (1), 2), dst)
    else if (trimmedLine.match(/^\d+\)/)) {
      if (currentParagraph.length > 0) {
        formattedContent.push({
          type: 'paragraph',
          content: currentParagraph.join(' '),
        });
        currentParagraph = [];
      }
      formattedContent.push({
        type: 'numberedItem',
        content: trimmedLine,
      });
    }
    // Jika bullet points (- )
    else if (trimmedLine.startsWith('- ')) {
      formattedContent.push({
        type: 'bulletPoint',
        content: trimmedLine.substring(2),
      });
    }
    // Jika quote ("...")
    else if (trimmedLine.startsWith('"') && trimmedLine.endsWith('"')) {
      if (currentParagraph.length > 0) {
        formattedContent.push({
          type: 'paragraph',
          content: currentParagraph.join(' '),
        });
        currentParagraph = [];
      }
      formattedContent.push({
        type: 'quote',
        content: trimmedLine,
      });
    }
    // Paragraph biasa
    else {
      currentParagraph.push(trimmedLine);
    }
  });

  // Jika masih ada paragraph yang belum ditambahkan
  if (currentParagraph.length > 0) {
    formattedContent.push({
      type: 'paragraph',
      content: currentParagraph.join(' '),
    });
  }

  return formattedContent;
};

// Function untuk render konten berdasarkan type
export const renderContentItem = (item, index) => {
  switch (item.type) {
    case 'header':
      return (
        <div key={index} className="mt-8 mb-6">
          <h3 className="text-2xl font-bold text-green-400 mb-2 border-b-2 border-green-500/30 pb-2 inline-block">{item.content}</h3>
        </div>
      );

    case 'quote':
      return (
        <div key={index} className="my-8">
          <blockquote className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-l-4 border-green-400 p-6 rounded-r-xl italic">
            <p className="text-green-200 text-xl font-medium leading-relaxed">{item.content}</p>
          </blockquote>
        </div>
      );

    case 'numberedItem':
      return (
        <div key={index} className="mb-4">
          <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-4 hover:bg-slate-700/30 transition-colors duration-300">
            <p className="text-green-300 font-semibold text-lg leading-relaxed">{item.content}</p>
          </div>
        </div>
      );

    case 'bulletPoint':
      return (
        <div key={index} className="flex items-start gap-3 mb-3 ml-4">
          <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
          <p className="text-slate-300 leading-relaxed">{item.content}</p>
        </div>
      );

    case 'paragraph':
      return (
        <p key={index} className="text-slate-200 leading-relaxed text-lg mb-4">
          {item.content}
        </p>
      );

    default:
      return null;
  }
};
