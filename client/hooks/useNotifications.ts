import { useEffect, useCallback } from "react";
import { Reminder } from "@shared/types";

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }, []);

  const showNotification = useCallback((reminder: Reminder) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(`Reminder: ${reminder.title}`, {
        body: `${reminder.description || ""}\nType: ${reminder.type}`,
        icon: "/favicon.ico",
        tag: reminder.id,
        requireInteraction: true,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      setTimeout(() => {
        notification.close();
      }, 10000);
    }
  }, []);

  const scheduleNotification = (reminder: Reminder) => {
    const now = new Date();
    const delay = reminder.dateTime.getTime() - now.getTime();
    if (delay > 0) {
      setTimeout(async () => {
        if (Notification.permission !== "granted") {
          const granted = await requestPermission();
          if (!granted) {
            alert("Please enable notifications to receive reminders.");
            return;
          }
        }
        showNotification(reminder);
        playNotificationSound();
      }, delay);
    }
  };

  const playNotificationSound = useCallback(() => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  return {
    requestPermission,
    showNotification,
    scheduleNotification,
    playNotificationSound,
  };
}
