"use client";

import { useState } from "react";
import { Stock, Order, placeOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
//import { toast } from '@/components/ui/use-toast'
import { toast } from "@/hooks/use-toast";

interface OrderFormProps {
  stock: Stock;
}

export default function OrderForm({ stock }: OrderFormProps) {
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [action, setAction] = useState<"buy" | "sell">("buy");
  const [shares, setShares] = useState("");
  const [limitPrice, setLimitPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = {
      symbol: stock.symbol,
      type: orderType,
      action: action,
      shares: parseInt(shares),
      price: orderType === "limit" ? parseFloat(limitPrice) : undefined,
    };
    try {
      await placeOrder(order);
      toast({
        title: "Order placed successfully",
        description: `${action} ${shares} shares of ${stock.symbol} at ${
          orderType === "market" ? "market price" : `$${limitPrice}`
        }`,
      });
      setShares("");
      setLimitPrice("");
    } catch (error) {
      toast({
        title: "Error placing order",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <Label>Order Type</Label>
        <RadioGroup
          defaultValue="market"
          onValueChange={(value) => setOrderType(value as "market" | "limit")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="market" id="market" />
            <Label htmlFor="market">Market</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="limit" id="limit" />
            <Label htmlFor="limit">Limit</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Action</Label>
        <RadioGroup
          defaultValue="buy"
          onValueChange={(value) => setAction(value as "buy" | "sell")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="buy" id="buy" />
            <Label htmlFor="buy">Buy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sell" id="sell" />
            <Label htmlFor="sell">Sell</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="shares">Number of Shares</Label>
        <Input
          id="shares"
          type="number"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          required
          min="1"
        />
      </div>
      {orderType === "limit" && (
        <div>
          <Label htmlFor="limitPrice">Limit Price</Label>
          <Input
            id="limitPrice"
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>
      )}
      <Button type="submit">Place Order</Button>
    </form>
  );
}
