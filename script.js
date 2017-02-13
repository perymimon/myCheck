/**
 * Created by pery on 2/13/2017.
 */
var app = angular.module('app', [])
    .controller('MenuController', function($scope,$http) {
        var url = "menu.json";
        $http.get(url).then(function (res) {
            $scope.menu = cleanData(res.data);
        })

    })
    .controller('BarController',function ($scope) {
        $scope.context = {
            theme:'theme/theme-style-red.css',
            layout:'layout/layout-style-responsive.css'
        };
        $scope.changeStyleTheme = changeStyleTheme;

        changeStyleTheme('theme',$scope.context.theme);
        changeStyleTheme('layout',$scope.context.layout);
    });

    function changeStyleTheme(id, cssFile){
        var oldlink = document.getElementById(id);

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("id", id);
        newlink.setAttribute("href", cssFile);

        oldlink.parentNode.replaceChild(newlink, oldlink);
    };


function cleanData(columns){
    return _.map(columns, department =>  {
        return {
            id: department.id,
            name: department.Name,
            description: department.Description,
            items: _.map(department.Classes[0].Items, item => {
                return {
                    id: item.id,
                    name: item.Name,
                    description: item.Description,
                    price: item.Price,
                    modifiersGroups: _.map(item.ModifierGroups, modifiersGroup => {
                        return {
                            id: modifiersGroup.id,
                            name: modifiersGroup.Name,
                            description: modifiersGroup.Description,
                            modifiers: _.map(modifiersGroup.Modifiers, modifier => {
                                return {
                                    id: modifier.id,
                                    name: modifier.Name,
                                    description: modifier.Description,
                                    price: modifier.Price
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

angular.bootstrap(document, ['app']);


