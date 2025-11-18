import { Product, CartItem } from "@/types/product";

const BUSINESS_PHONE = "254722123456"; // Replace with actual Rable Bakes WhatsApp number

export const generateWhatsAppLink = (
  product: Product,
  size?: string,
  servings?: string,
  customerName?: string
): string => {
  const productInfo = `${product.name} (ID: ${product.id})`;
  const sizeInfo = size ? `Size: ${size}` : "Size: ____";
  const servingsInfo = servings ? `Servings: ${servings}` : "";
  const nameInfo = customerName ? `Name: ${customerName}` : "Name: ____";
  
  const message = `Hi Rable Bakes! I want to customize this cake: ${productInfo}. ${sizeInfo}. ${servingsInfo}. Event date: ____. ${nameInfo}. Please contact me. Thanks!`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
};

export const generateCartWhatsAppLink = (cartItems: CartItem[]): string => {
  let message = "Hi Rable Bakes! I'd like to order:\n\n";
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.id})\n`;
    if (item.selectedSize) message += `   Size: ${item.selectedSize}\n`;
    if (item.selectedServings) message += `   Servings: ${item.selectedServings}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: KSh ${(item.selectedPrice || item.price) * item.quantity}\n\n`;
  });
  
  const total = cartItems.reduce((sum, item) => sum + (item.selectedPrice || item.price) * item.quantity, 0);
  message += `Total: KSh ${total}\n\n`;
  message += "My details:\nName: ____\nPhone: ____\nDelivery Address: ____\nPreferred Date & Time: ____";
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_PHONE}?text=${encodedMessage}`;
};
