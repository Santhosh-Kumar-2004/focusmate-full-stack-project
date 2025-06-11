// /utils/SchedulerLogic.js
export const scheduleTasks = (tasks) => {
  const startHour = 10;
  const startMinute = 0;

  let currentTime = new Date();
  currentTime.setHours(startHour, startMinute, 0, 0);

  return tasks.map((task) => {
    const startTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const scheduledTask = { ...task, startTime };
    
    currentTime = new Date(currentTime.getTime() + task.duration * 60000);

    return scheduledTask;
  });
};
