import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Shield, Heart, DollarSign } from 'lucide-react'

// Mock data for demonstration
const totalDonations = 15780
const donationGoal = 20000
const newDonators = [
  { name: 'Alice Johnson', amount: 50 },
  { name: 'Bob Smith', amount: 100 },
  { name: 'Charlie Brown', amount: 25 },
]
const pastDonations = [
  { name: 'David Lee', amount: 200, date: '2023-12-01' },
  { name: 'Eva Garcia', amount: 75, date: '2023-11-28' },
  { name: 'Frank Wilson', amount: 150, date: '2023-11-25' },
]

export default function DonationPage() {
  const [donationAmount, setDonationAmount] = useState('')

  const handleDonate = () => {
    // Implement donation logic here
    console.log(`Donating $${donationAmount}`)
    // Reset donation amount
    setDonationAmount('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Support CodeShield</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2" /> Help Us Keep You Safe
            </CardTitle>
            <CardDescription>
              Your support helps us continue developing cutting-edge security tools for the developer community.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              CodeShield is sustained by the generosity of developers like you. Every donation, big or small, contributes to a more secure coding environment for all.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Donations</span>
                <span>${totalDonations.toLocaleString()} / ${donationGoal.toLocaleString()}</span>
              </div>
              <Progress value={(totalDonations / donationGoal) * 100} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Input
              type="number"
              placeholder="Enter donation amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleDonate} className="w-full">
              <Heart className="mr-2" /> Donate Now
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Supporters</CardTitle>
              <CardDescription>Thank you to our newest donors!</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {newDonators.map((donator, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="mr-2">
                        <AvatarFallback>{donator.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{donator.name}</span>
                    </div>
                    <span className="font-semibold">${donator.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Past Donations</CardTitle>
              <CardDescription>Your generosity makes a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {pastDonations.map((donation, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div>
                      <div>{donation.name}</div>
                      <div className="text-sm text-muted-foreground">{donation.date}</div>
                    </div>
                    <span className="font-semibold">${donation.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Your Support Matters</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Every contribution helps us improve CodeShield, develop new features, and stay ahead of emerging security threats. Together, we're building a safer coding environment for developers worldwide.
        </p>
      </div>
    </div>
  )
}