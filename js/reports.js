// js/reports.js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('download-report');
  btn?.addEventListener('click', gerarRelatorioPDF);
});

function gerarRelatorioPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const now = new Date();
    const dateOnly = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const dateBR = now.toLocaleDateString('pt-BR');
    const timeBR = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    doc.setFontSize(18);
    doc.text('Relatório de Monitoria', 105, 15, { align: 'center' });
    doc.setFontSize(11);
    doc.text(`Gerado em: ${dateBR} às ${timeBR}`, 105, 22, { align: 'center' });

    // Horários
    const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    doc.setFontSize(14);
    doc.text('Registros de Horários', 14, 35);
    if (schedules.length) {
      doc.autoTable({
        startY: 40,
        head: [['Monitor', 'Data', 'Entrada', 'Saída']],
        body: schedules.map(s => [s.monitor, s.date, s.entry, s.exit])
      });
    } else {
      doc.setFontSize(12);
      doc.text('Nenhum registro de horário encontrado.', 14, 45);
    }

    const afterTableY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 70;

    // Faltas
    const absences = JSON.parse(localStorage.getItem('absences') || '[]');
    doc.setFontSize(14);
    doc.text('Registros de Faltas', 14, afterTableY);
    if (absences.length) {
      doc.autoTable({
        startY: afterTableY + 5,
        head: [['Aluno', 'Série', 'Data', 'Motivo']],
        body: absences.map(a => [a.student, a.grade, a.date, a.reason])
      });
    } else {
      doc.setFontSize(12);
      doc.text('Nenhuma falta registrada.', 14, afterTableY + 8);
    }

    const footerY = doc.internal.pageSize.height - 10;
    doc.setFontSize(9);
    doc.text('Sistema de Monitoria', 105, footerY, { align: 'center' });

    const filename = `Relatorio_Monitoria_${dateOnly}.pdf`;
    doc.save(filename);
    alert(`Relatório gerado e baixado: ${filename}`);
  } catch (err) {
    console.error('Erro ao gerar PDF', err);
    alert('Erro ao gerar o PDF. Abra o console para detalhes.');
  }
}
