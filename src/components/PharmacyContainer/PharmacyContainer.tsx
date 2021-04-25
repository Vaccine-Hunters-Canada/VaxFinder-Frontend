import React, {useState} from 'react';
import {Card, Stack, Icon, Link} from '@shopify/polaris';
import {
    CircleTickMajorMonotone,
    MobileCancelMajorMonotone
  } from '@shopify/polaris-icons';

interface PharmacyProps{
    pharmacy:{
        id:string
        pharmacyName:string
        booking:boolean
        address:string
        phone:string
        website:string
        lastUpdated: string
    }
}

export function PharmacyContainer({pharmacy}:PharmacyProps){

    const [booking, setBooking] = useState(pharmacy.booking);
    const [lastUpdated, setlastUpdated] = useState(pharmacy.lastUpdated);

    const updatePharmacy = (availability:boolean) => {
        
        let time = new Date();
        setlastUpdated(time.toLocaleString());
        setBooking(availability);

    }

    const availabilityMarkup = () => {
        if(booking){
            return(
                <Stack>
                    <Icon
                        source={CircleTickMajorMonotone}
                        color="green" 
                    /> 
                    <p><strong>Appointments available</strong> as of {lastUpdated}</p>
                </Stack>
            )
        }else{
            return(
                <Stack>
                    <Icon
                        source={MobileCancelMajorMonotone}
                        color="red" 
                    /> 
                    <p><strong>Appointments not available</strong> as of {lastUpdated}</p>
                </Stack>
            )
        }
    }
    return(
        <section>
            <Card title = {pharmacy.pharmacyName} sectioned  primaryFooterAction={{content:"Report Availability", onAction: () =>{updatePharmacy(true)}}}
            secondaryFooterActions={[
            {content: "Report No Availability", onAction: () =>{updatePharmacy(false)}}
            ]}>
                <Card.Section>
                    {availabilityMarkup()}       
                </Card.Section>
                <Card.Section title="Store Info">
                    <Card.Subsection>
                        {pharmacy.address}
                    </Card.Subsection>
                    <Card.Subsection>
                        {pharmacy.phone}
                    <br />
                        <Link url={pharmacy.website}>{pharmacy.website}</Link>
                    </Card.Subsection>
                </Card.Section>
            </Card>
        </section>
    );
}