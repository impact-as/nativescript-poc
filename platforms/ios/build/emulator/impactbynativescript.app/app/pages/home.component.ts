import { Component } from '@angular/core';

@Component({
    selector: 'page-home',
    template:`
        
        <StackLayout>
            <Label text="Welcome to IMPACT by NativeScript"></Label>
            <ScrollView>
                <StackLayout>
                    <HtmlView [html]="html"></HtmlView>
                    <Button nsRouterLink="/login"></Button>  
                </StackLayout> 
            </ScrollView> 
        </StackLayout>
       
    `
})
export class HomeComponent {

        
    public html = `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ultricies quam. Nullam porttitor scelerisque purus, a pretium sem accumsan eget. Morbi ut posuere elit, nec mattis elit. Morbi ac orci placerat leo tincidunt tempus a sed justo. Phasellus ut massa quam. Suspendisse scelerisque tempus quam, eget mollis ligula suscipit id. Cras vitae enim vel massa malesuada scelerisque. Praesent gravida faucibus sem, auctor dapibus arcu blandit non. Donec eget iaculis odio, nec rutrum felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
    <p>Nulla facilisi. Donec odio lectus, luctus at tortor a, aliquam eleifend massa. Proin vitae leo sit amet neque commodo pharetra. Pellentesque iaculis congue dolor nec gravida. Cras ullamcorper erat at lorem laoreet imperdiet ac in lectus. Phasellus eget neque scelerisque, ultricies arcu in, luctus leo. Proin in consectetur elit, nec imperdiet nunc. Proin porta nisi sit amet euismod laoreet. Phasellus ipsum arcu, tincidunt tempus tempor non, egestas sit amet nibh. Duis vulputate tristique libero, vel sodales nisl tincidunt eget. Mauris et tortor ut ligula malesuada ultricies. Nulla imperdiet enim nec ligula ultricies, quis varius eros consequat. Morbi at sem venenatis, finibus tortor vestibulum, bibendum leo.</p>
    <p>Duis non arcu sed massa aliquam volutpat. Vivamus hendrerit luctus vestibulum. Quisque vel ultricies lorem. Aenean efficitur ipsum eget ante venenatis varius. Nam a mi massa. Quisque convallis eros ligula, sit amet pellentesque nibh rutrum vel. Nam mattis malesuada fermentum. Curabitur maximus volutpat lacus, quis maximus diam egestas at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer in mattis massa, mattis lacinia nunc. Fusce rutrum leo a hendrerit rhoncus. Etiam a tellus lorem. Cras hendrerit non enim ac pharetra.</p>
    <p>Nulla porttitor ligula tortor. Etiam consequat faucibus sem, et ultricies lorem ornare vel. In dapibus varius fermentum. Curabitur eget eros vel urna tincidunt auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lorem nec metus vehicula, et faucibus augue molestie. Proin in maximus urna. Suspendisse varius non sem ac posuere. Duis dignissim urna a elementum porttitor. Sed commodo, quam sed vehicula vestibulum, ipsum orci posuere libero, eget iaculis lorem quam id purus. Quisque aliquet lorem leo, nec suscipit libero posuere vitae. Nulla leo ante, viverra eget mauris mollis, lacinia tincidunt neque. Nullam nec lacus at elit accumsan euismod vitae vel dolor. Maecenas at dui sit amet turpis placerat malesuada.</p>
    <p>Aliquam iaculis at odio et gravida. Fusce in scelerisque mauris. Nullam eu libero maximus metus auctor faucibus. Proin in arcu ex. Maecenas blandit, tellus vitae imperdiet euismod, ante tellus euismod eros, sed bibendum arcu lacus non lectus. Sed eu semper sapien, sed hendrerit purus. Sed aliquam blandit lacus, vel consectetur justo semper eu. Donec pulvinar quis turpis eu vehicula. Vestibulum elit ante, fringilla et mi in, porttitor sodales est. Pellentesque scelerisque convallis velit, at scelerisque elit accumsan a. Aenean vel dolor vel augue gravida dictum a at neque.</p>
`
}