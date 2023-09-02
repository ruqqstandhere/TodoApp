/**
 * Returns a task completion message based on the completion percentage.
 * @param {number} completionPercentage - The completion percentage of tasks.
 * @returns {string} A task completion message.
 */
export const getTaskCompletionText = (completionPercentage: number): string => {
  switch (true) {
    case completionPercentage === 0:
      return "Tidak ada jadwal terselesaikan!";
    case completionPercentage === 100:
      return "Selamat Tugas Anda Telah Selesai Semua, you did great well!";
    case completionPercentage >= 75:
      return "Semangat Kurang Dikit Lagi";
    case completionPercentage >= 50:
      return "Masih Setengah Perjalananmu, Ayo Semangat";
    case completionPercentage >= 25:
      return "Langkah Yang Bagus, Ayo Teruskan";
    default:
      return "Langkah Awal Mengubah Dunia, adalah mengubah dirimu Sendiri";
  }
};
